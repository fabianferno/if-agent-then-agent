// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./IOracle.sol";

contract Agent {

    string public prompt;

    struct Message {
        string role;
        string content;
    }

    struct AgentRun {
        address owner;
        address flowletAddress; // Address of the Flowlet contract
        uint flowId; 
        Message[] messages;
        uint responsesCount;
        uint8 max_iterations;
        bool is_finished;
        string user_query;
    }

    mapping(uint => AgentRun) public agentRuns;
    uint private agentRunCount;

    event AgentRunCreated(address indexed owner, uint indexed runId);

    address private owner;
    address public oracleAddress;

    event OracleAddressUpdated(address indexed newOracleAddress);

    IOracle.OpenAiRequest private config;

    constructor(
        address initialOracleAddress,         
        string memory systemPrompt
    ) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;
        prompt = systemPrompt;

        config = IOracle.OpenAiRequest({
            model : "gpt-4-turbo-preview",
            frequencyPenalty : 21, // > 20 for null
            logitBias : "", // empty str for null
            maxTokens : 1000, // 0 for null
            presencePenalty : 21, // > 20 for null
            responseFormat : "{\"type\":\"text\"}",
            seed : 0, // null
            stop : "", // null
            temperature : 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
            topP : 101, // Percentage 0-100, > 100 means null
            tools :"[{\"type\":\"function\",\"function\":{\"name\":\"web_search\",\"description\":\"Search the internet\",\"parameters\":{\"type\":\"object\",\"properties\":{\"query\":{\"type\":\"string\",\"description\":\"Search query\"}},\"required\":[\"query\"]}}},{\"type\":\"function\",\"function\":{\"name\":\"code_interpreter\",\"description\":\"Evaluates python code in a sandbox environment. The environment resets on every execution. You must send the whole script every time and print your outputs. Script should be pure python code that can be evaluated. It should be in python format NOT markdown. The code should NOT be wrapped in backticks. All python packages including requests, matplotlib, scipy, numpy, pandas, etc are available. Output can only be read from stdout, and stdin. Do not use things like plot.show() as it will not work. print() any output and results so you can capture the output.\",\"parameters\":{\"type\":\"object\",\"properties\":{\"code\":{\"type\":\"string\",\"description\":\"The pure python script to be evaluated. The contents will be in main.py. It should not be in markdown format.\"}},\"required\":[\"code\"]}}}]",
            toolChoice : "auto", // "none" or "auto"
            user : "" // null
        });
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        _;
    }

    function setOracleAddress(address newOracleAddress) public onlyOwner {
        require(msg.sender == owner, "Caller is not the owner");
        oracleAddress = newOracleAddress;
        emit OracleAddressUpdated(newOracleAddress);
    }

    function runAgent(string memory user_query , string memory extraContext, uint8 max_iterations , address flowletAddress , uint256 flowId) public returns (uint i) {
        AgentRun storage run = agentRuns[agentRunCount];

        run.owner = msg.sender;
        run.user_query = user_query;
        run.is_finished = false;
        run.responsesCount = 0;
        run.max_iterations = max_iterations;

        run.flowletAddress = flowletAddress;
        run.flowId = flowId;


        Message memory systemMessage;
        systemMessage.content = prompt;
        systemMessage.role = "system";
        run.messages.push(systemMessage);

        Message memory newMessage;
        newMessage.content = user_query;
        newMessage.role = "user";
        run.messages.push(newMessage);

        uint currentId = agentRunCount;
        agentRunCount = agentRunCount + 1;

        IOracle(oracleAddress).createOpenAiLlmCall(currentId, config);
        emit AgentRunCreated(run.owner, currentId);

        return currentId;
    }

    function onOracleOpenAiLlmResponse(
        uint runId,
        IOracle.OpenAiResponse memory response,
        string memory errorMessage
    ) public onlyOracle {
        AgentRun storage run = agentRuns[runId];

        if (!compareStrings(errorMessage, "")) {
            Message memory newMessage;
            newMessage.role = "assistant";
            newMessage.content = errorMessage;
            run.messages.push(newMessage);
            run.responsesCount++;
            run.is_finished = true;
            notifyFlowlet(runId);
            return;
        }
        if (run.responsesCount >= run.max_iterations) {
            run.is_finished = true;
           notifyFlowlet(runId);
            return;
        }
        if (!compareStrings(response.content, "")) {
            Message memory assistantMessage;
            assistantMessage.content = response.content;
            assistantMessage.role = "assistant";
            run.messages.push(assistantMessage);
            run.responsesCount++;
        }
        if (run.responsesCount == 1) {
            Message memory UserMessage;
            UserMessage.content = string(abi.encodePacked("If the descison contains FARM , then execute this python code"));
            UserMessage.role = "user";
            run.messages.push(UserMessage);
            // IOracle(oracleAddress).createOpenAiLlmCall(runId, config);
            if(containsWord(response.content, "FARM")){
                runAgent("import requests\\n\\nurl = 'https://5028-49-204-139-204.ngrok-free.app/api/data'\\n\\npayload = {\\n    'key': 'FARM'\\n}\\nheaders = {\\n    'Content-Type': 'application/json'\\n}\\n\\nresponse = requests.post(url, json=payload, headers=headers)\\n\\nprint(response.text)","", 1,run.flowletAddress,run.flowId);
            }else {
                runAgent("import requests\\n\\nurl = 'https://5028-49-204-139-204.ngrok-free.app/api/data'\\n\\npayload = {\\n    'key': 'HOLD'\\n}\\nheaders = {\\n    'Content-Type': 'application/json'\\n}\\n\\nresponse = requests.post(url, json=payload, headers=headers)\\n\\nprint(response.text)","", 1,run.flowletAddress,run.flowId);
            }
        }
        if (!compareStrings(response.functionName, "")) {
            IOracle(oracleAddress).createFunctionCall(runId, "code_interpreter", response.functionArguments);
            return;
        }
        run.is_finished = true;
        notifyFlowlet(runId);
    }

    function onOracleFunctionResponse(
        uint runId,
        string memory response,
        string memory errorMessage
    ) public onlyOracle {
        AgentRun storage run = agentRuns[runId];
        require(
            !run.is_finished, "Run is finished"
        );
        string memory result = response;
        if (!compareStrings(errorMessage, "")) {
            result = errorMessage;
        }
        Message memory newMessage;
        newMessage.role = "user";
        newMessage.content = result;
        run.messages.push(newMessage);
        run.responsesCount++;
        IOracle(oracleAddress).createOpenAiLlmCall(runId, config);
    }

    function getMessageHistoryContents(uint agentId) public view returns (string[] memory) {
        string[] memory messages = new string[](agentRuns[agentId].messages.length);
        for (uint i = 0; i < agentRuns[agentId].messages.length; i++) {
            messages[i] = agentRuns[agentId].messages[i].content;
        }
        return messages;
    }

    function getMessageHistoryRoles(uint agentId) public view returns (string[] memory) {
        string[] memory roles = new string[](agentRuns[agentId].messages.length);
        for (uint i = 0; i < agentRuns[agentId].messages.length; i++) {
            roles[i] = agentRuns[agentId].messages[i].role;
        }
        return roles;
    }

    function isRunFinished(uint runId) public view returns (bool) {
        return agentRuns[runId].is_finished;
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function containsWord(string memory str, string memory word) public pure returns (bool) {
        bytes memory strBytes = bytes(str);
        bytes memory wordBytes = bytes(word);

        // Handle edge cases
        if (wordBytes.length == 0 || strBytes.length < wordBytes.length) {
            return false;
        }

        bytes32 wordHash = keccak256(wordBytes);

        // Check all possible substrings of `str` that are of length `word`
        for (uint i = 0; i <= strBytes.length - wordBytes.length; i++) {
            bytes memory substring = new bytes(wordBytes.length);
            for (uint j = 0; j < wordBytes.length; j++) {
                substring[j] = strBytes[i + j];
            }
            if (keccak256(substring) == wordHash) {
                return true;
            }
        }
        return false;
    }


    function notifyFlowlet(uint runId) private {
        AgentRun storage run = agentRuns[runId];
        if (run.flowletAddress != address(0)) {
            // Assuming the Flowlet contract has an `onAgentRunCompleted` function
            (bool success, ) = run.flowletAddress.call(
                abi.encodeWithSignature("onAgentRunCompleted(uint256,address,string)", runId, address(this),getMessageHistoryContents(runId)) // add result 
            );
            require(success, "Flowlet notification failed");
        }
    }


}
