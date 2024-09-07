// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IAgent {
    function runAgent(string memory userQuery, string memory query, uint8 maxIterations , address callbackAddress , uint256 flowId) external returns (uint);
}

contract Flowlet {

    struct Flow {
        address[] agents; // Array of agents in the flow sequence
        uint currentAgentIndex; // Index of the current agent to run
        uint runId; // Run ID for tracking
        address owner; // Owner of the flow
        bool isFinished; // Flow completion status
    }

    struct AgentsTask {
        address agentAddress;
        string userQuery;
        string AgentSpecificParam;

    }

    mapping(uint => Flow) public flows; // Mapping of flow IDs to flows
    uint public flowCount; // Count of flows created

    event FlowCreated(uint indexed flowId, address indexed owner);
    event AgentTriggered(uint indexed flowId, address indexed agent, uint runId);
    event FlowCompleted(uint indexed flowId);

    // Start a new flow with a sequence of agents
    function startFlow(address[] memory agents, string memory GoalQuery) public returns (uint) {  /// extra params [] 
        uint flowId = flowCount;
        Flow storage flow = flows[flowId];
        flow.agents = agents;
        flow.currentAgentIndex = 0;
        flow.owner = msg.sender;
        flow.isFinished = false;
        flowCount++;

        emit FlowCreated(flowId, msg.sender);

        // Trigger the first agent
        triggerNextAgent(flowId,GoalQuery,"");

        return flowId;
    }

    // Callback function called by agents when their run is completed
    function onAgentRunCompleted(uint runId, address agent,string memory result) external {
        uint flowId = findFlowIdByRunId(runId); // Find the corresponding flowId
        Flow storage flow = flows[flowId];

        require(!flow.isFinished, "Flow is already finished");
        require(flow.agents[flow.currentAgentIndex] == agent, "Invalid agent callback");

        flow.currentAgentIndex++;

        if (flow.currentAgentIndex >= flow.agents.length) {
            flow.isFinished = true;
            emit FlowCompleted(flowId);
        } else {
            triggerNextAgent(flowId,"Analyze the farcaster account of leofrank and feed the data to the Crypto agent and analyzes the trends",result);
        }
    }

    // Triggers the next agent in the sequence
    function triggerNextAgent(uint flowId ,string memory GoalQuery,string memory result) internal {
        Flow storage flow = flows[flowId];
        require(!flow.isFinished, "Flow is already finished");

        address nextAgent = flow.agents[flow.currentAgentIndex];
        string memory query = string(abi.encodePacked(GoalQuery,"Result from PreviousAgent : ",result));
        uint runId = IAgent(nextAgent).runAgent(query, "leofrank", 2,address(this),flowId); // Customize params as needed

        flow.runId = runId;
        emit AgentTriggered(flowId, nextAgent, runId);
    }

    // Finds the flowId based on the runId
    function findFlowIdByRunId(uint runId) internal view returns (uint) {
        for (uint i = 0; i < flowCount; i++) {
            if (flows[i].runId == runId) {
                return i;
            }
        }
        revert("FlowId not found for the given runId");
    }
}
