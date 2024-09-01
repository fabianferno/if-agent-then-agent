// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./IOracle.sol";

// @title Agent
// @notice This contract interacts with teeML oracle to run agents that perform multiple iterations of querying and responding using a large language model (LLM).
contract Agent {
    string public prompt;

    struct AgentRun {
        address owner;
        IOracle.Message[] messages;
        uint responsesCount;
        uint8 max_iterations;
        bool is_finished;
    }

    // @notice Mapping from run ID to AgentRun
    mapping(uint => AgentRun) public agentRuns;
    uint private agentRunCount;

    // @notice Event emitted when a new agent run is created
    event AgentRunCreated(address indexed owner, uint indexed runId);

    // @notice Address of the contract owner
    address private owner;

    // @notice Address of the oracle contract
    address public oracleAddress;

    // @notice Event emitted when the oracle address is updated
    event OracleAddressUpdated(address indexed newOracleAddress);
    bool contains;

    // @notice Configuration for the OpenAI request
    IOracle.OpenAiRequest private config;

    // @param initialOracleAddress Initial address of the oracle contract
    // @param systemPrompt Initial prompt for the system message
    constructor(address initialOracleAddress, string memory systemPrompt) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;
        prompt = systemPrompt;

        config = IOracle.OpenAiRequest({
            model: "gpt-4-turbo-preview",
            frequencyPenalty: 21, // > 20 for null
            logitBias: "", // empty str for null
            maxTokens: 1000, // 0 for null
            presencePenalty: 21, // > 20 for null
            responseFormat: '{"type":"text"}',
            seed: 0, // null
            stop: "", // null
            temperature: 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
            topP: 101, // Percentage 0-100, > 100 means null
            tools: '[{"type":"function","function":{"name":"code_interpreter","description":"Evaluates Python code in a sandbox environment. The environment resets on every execution. You must send the whole script every time and print your outputs. Script should be pure Python code that can be evaluated and you can also execute api calls. It should be in Python format, not markdown. The code should not be wrapped in backticks. All Python packages including requests, matplotlib, scipy, numpy, pandas, etc., are available. Output can only be read from stdout and stdin. Do not use things like plot.show() as it will not work. Print any output and results so you can capture the output.","parameters":{"type":"object","properties":{"code":{"type":"string","description":"The pure Python script to be evaluated. The contents will be in main.py. It should not be in markdown format."}},"required":["code"]}}}]',
            toolChoice: "auto", // "none" or "auto"
            user: "" // null
        });
    }

    // @notice Ensures the caller is the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    // @notice Ensures the caller is the oracle contract
    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        _;
    }

    // @notice Updates the oracle address
    // @param newOracleAddress The new oracle address to set
    function setOracleAddress(address newOracleAddress) public onlyOwner {
        require(msg.sender == owner, "Caller is not the owner");
        oracleAddress = newOracleAddress;
        emit OracleAddressUpdated(newOracleAddress);
    }

    // @notice Starts a new agent run
    // @param query The initial user query
    // @param max_iterations The maximum number of iterations for the agent run
    // @return The ID of the newly created agent run
    function runAgent(
        string memory query,
        uint8 max_iterations
    ) public returns (uint) {
        AgentRun storage run = agentRuns[agentRunCount];

        run.owner = msg.sender;
        run.is_finished = false;
        run.responsesCount = 0;
        run.max_iterations = max_iterations;

        IOracle.Message memory systemMessage = createTextMessage(
            "system",
            prompt
        );
        run.messages.push(systemMessage);

        IOracle.Message memory newMessage = createTextMessage("user", query);
        run.messages.push(newMessage);

        uint currentId = agentRunCount;
        agentRunCount = agentRunCount + 1;

        IOracle(oracleAddress).createOpenAiLlmCall(currentId, config);
        emit AgentRunCreated(run.owner, currentId);

        return currentId;
    }

    // @notice Handles the response from the oracle for an OpenAI LLM call
    // @param runId The ID of the agent run
    // @param response The response from the oracle
    // @param errorMessage Any error message
    // @dev Called by teeML oracle
    function onOracleOpenAiLlmResponse(
        uint runId,
        IOracle.OpenAiResponse memory response,
        string memory errorMessage
    ) public onlyOracle {
        AgentRun storage run = agentRuns[runId];

        if (!compareStrings(errorMessage, "")) {
            IOracle.Message memory newMessage = createTextMessage(
                "assistant",
                errorMessage
            );
            run.messages.push(newMessage);
            run.responsesCount++;
            run.is_finished = true;
            return;
        }
        if (run.responsesCount >= run.max_iterations) {
            run.is_finished = true;
            return;
        }
        if (!compareStrings(response.content, "")) {
            IOracle.Message memory newMessage = createTextMessage(
                "assistant",
                response.content
            );
            run.messages.push(newMessage);
            run.responsesCount++;
        }
        if (
            !compareStrings(response.functionName, "") && run.responsesCount < 2
        ) {
            IOracle(oracleAddress).createFunctionCall(
                runId,
                response.functionName,
                response.functionArguments
            );
            return;
        }
        if (run.responsesCount == 2) {
            IOracle.Message memory newMessage = createTextMessage(
                "system",
                "If the descison contains FARM , then execute this python code"
            );
            run.messages.push(newMessage);
            //  IOracle.Message memory newMessage1 =  createTextMessage("user", "import requests\\n\\nurl = 'https://5028-49-204-139-204.ngrok-free.app/api/data'\\n\\npayload = {\\n    'key': 'value'\\n}\\nheaders = {\\n    'Content-Type': 'application/json'\\n}\\n\\nresponse = requests.post(url, json=payload, headers=headers)\\n\\nprint(response.text)");
            // run.messages.push(newMessage1);

            if (containsWord(response.content, "FARM")) {
                contains = true;
                runAgent(
                    "import requests\\n\\nurl = 'https://5028-49-204-139-204.ngrok-free.app/api/data'\\n\\npayload = {\\n    'key': 'FARM'\\n}\\nheaders = {\\n    'Content-Type': 'application/json'\\n}\\n\\nresponse = requests.post(url, json=payload, headers=headers)\\n\\nprint(response.text)",
                    1
                );
            } else {
                runAgent(
                    "import requests\\n\\nurl = 'https://5028-49-204-139-204.ngrok-free.app/api/data'\\n\\npayload = {\\n    'key': 'HOLD'\\n}\\nheaders = {\\n    'Content-Type': 'application/json'\\n}\\n\\nresponse = requests.post(url, json=payload, headers=headers)\\n\\nprint(response.text)",
                    1
                );
            }
            // IOracle(oracleAddress).createFunctionCall(runId, "code_interpreter", "import requests\\n\\nurl = 'https://5028-49-204-139-204.ngrok-free.app/api/data'\\n\\npayload = {\\n    'key': 'value'\\n}\\nheaders = {\\n    'Content-Type': 'application/json'\\n}\\n\\nresponse = requests.post(url, json=payload, headers=headers)\\n\\nprint(response.text)");
            run.responsesCount++;
            return;
        }
        run.is_finished = true;
    }

    // @notice Handles the response from the oracle for a function call
    // @param runId The ID of the agent run
    // @param response The response from the oracle
    // @param errorMessage Any error message
    // @dev Called by teeML oracle
    function onOracleFunctionResponse(
        uint runId,
        string memory response,
        string memory errorMessage
    ) public onlyOracle {
        AgentRun storage run = agentRuns[runId];
        require(!run.is_finished, "Run is finished");

        string memory result = response;
        if (!compareStrings(errorMessage, "")) {
            result = errorMessage;
        }

        IOracle.Message memory newMessage = createTextMessage("user", result);
        run.messages.push(newMessage);
        run.responsesCount++;
        IOracle(oracleAddress).createOpenAiLlmCall(runId, config);
    }

    // @notice Retrieves the message history for a given agent run
    // @param agentId The ID of the agent run
    // @return An array of messages
    // @dev Called by teeML oracle
    function getMessageHistory(
        uint agentId
    ) public view returns (IOracle.Message[] memory) {
        return agentRuns[agentId].messages;
    }

    // @notice Checks if a given agent run is finished
    // @param runId The ID of the agent run
    // @return True if the run is finished, false otherwise
    function isRunFinished(uint runId) public view returns (bool) {
        return agentRuns[runId].is_finished;
    }

    // @notice Creates a text message with the given role and content
    // @param role The role of the message
    // @param content The content of the message
    // @return The created message
    function createTextMessage(
        string memory role,
        string memory content
    ) private pure returns (IOracle.Message memory) {
        IOracle.Message memory newMessage = IOracle.Message({
            role: role,
            content: new IOracle.Content[](1)
        });
        newMessage.content[0].contentType = "text";
        newMessage.content[0].value = content;
        return newMessage;
    }

    // @notice Compares two strings for equality
    // @param a The first string
    // @param b The second string
    // @return True if the strings are equal, false otherwise
    function compareStrings(
        string memory a,
        string memory b
    ) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function containsWord(
        string memory str,
        string memory word
    ) public pure returns (bool) {
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

    // @notice Handles incoming messages from other agents
    // @param message The message received from another agent
    function receiveMessage(string memory message) public {
        // Handle the received message
        IOracle.Message memory newMessage = createTextMessage("agent", message);
        agentRuns[agentRunCount - 1].messages.push(newMessage);
    }

    // @notice Returns the owner of the contract
    // @return The address of the contract owner
    function owner() public view returns (address) {
        return owner;
    }
}
