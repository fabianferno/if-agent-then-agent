// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IAgent {
    function runAgent(
        string memory userQuery,
        string memory query,
        uint8 maxIterations,
        address callbackAddress,
        uint256 flowId
    ) external returns (uint);
}

contract Flowlet {
    struct Flow {
        AgentsTask[] agents; // Array of agents in the flow sequence
        uint currentAgentIndex; // Index of the current agent to run
        uint runId; // Run ID for tracking
        address owner; // Owner of the flow
        bool isFinished; // Flow completion status
        string mainContext;
    }

    struct AgentsTask {
        address agentAddress;
        string agentContext;
    }

    mapping(uint => Flow) public flows; // Mapping of flow IDs to flows
    uint public flowCount; // Count of flows created

    event FlowCreated(uint indexed flowId, address indexed owner);
    event AgentTriggered(uint indexed flowId, address indexed agent, uint runId);
    event FlowCompleted(uint indexed flowId);
    event AgentResponse(uint indexed flowId, address indexed agent, string result);

    // Start a new flow with a sequence of agents
    function startFlow(AgentsTask[] memory agents, string memory _mainContext)
        public
        returns (uint)
    {
        uint flowId = flowCount;
        Flow storage flow = flows[flowId];
        flow.currentAgentIndex = 0;
        flow.owner = msg.sender;
        flow.isFinished = false;
        flow.mainContext = _mainContext;
        flowCount++;

        for (uint i = 0; i < agents.length; i++) {
            flow.agents.push(agents[i]);
        }

        emit FlowCreated(flowId, msg.sender);

        // Trigger the first agent
        triggerNextAgent(flowId, _mainContext, "none");

        return flowId;
    }

    // Callback function called by agents when their run is completed
    function onAgentRunCompleted(
        uint runId,
        address agent,
        string memory result
    ) external {
        uint flowId = findFlowIdByRunId(runId); // Find the corresponding flowId
        Flow storage flow = flows[flowId];

        require(!flow.isFinished, "Flow is already finished");
        require(
            flow.agents[flow.currentAgentIndex].agentAddress == agent,
            "Invalid agent callback"
        );

        emit AgentResponse(flowId, agent, result); // Emit the AgentResponse event

        flow.currentAgentIndex++;

        if (flow.currentAgentIndex >= flow.agents.length) {
            flow.isFinished = true;
            emit FlowCompleted(flowId);
        } else {
            triggerNextAgent(flowId, flow.mainContext, result);
        }
    }

    // Triggers the next agent in the sequence
    function triggerNextAgent(
        uint flowId,
        string memory _mainContext,
        string memory result
    ) internal {
        Flow storage flow = flows[flowId];
        require(!flow.isFinished, "Flow is already finished");
        address nextAgent = flow.agents[flow.currentAgentIndex].agentAddress;
        string memory query = string(
            abi.encodePacked(_mainContext, "Result from PreviousAgent: ", result)
        );
        uint runId = IAgent(nextAgent).runAgent(
            query,
            flow.agents[flow.currentAgentIndex].agentContext,
            2,
            address(this),
            flowId
        ); // Customize params as needed
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
