// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./CryptoAgent.sol";

contract AgentFactory {
    // Mapping from agent ID to Agent contract address
    mapping(uint => address) public agents;
    uint private agentCount;

    // Event emitted when a new agent is created
    event AgentCreated(address indexed agentAddress, uint indexed agentId);

    // Creates a new agent
    // @param initialOracleAddress Initial address of the oracle contract
    // @param systemPrompt Initial prompt for the system message
    // @return The ID of the newly created agent
    function createAgent(
        address initialOracleAddress,
        string memory systemPrompt
    ) public returns (uint) {
        CryptoAgent newAgent = new CryptoAgent(
            initialOracleAddress,
            systemPrompt
        );
        agents[agentCount] = address(newAgent);
        emit AgentCreated(address(newAgent), agentCount);
        agentCount++;
        return agentCount - 1;
    }

    // Allows an agent to send a message to another agent
    // @param fromAgentId The ID of the sending agent
    // @param toAgentId The ID of the receiving agent
    // @param message The message to send
    function sendMessage(
        uint fromAgentId,
        uint toAgentId,
        string memory message
    ) public {
        require(
            agents[fromAgentId] != address(0),
            "Sending agent does not exist"
        );
        require(
            agents[toAgentId] != address(0),
            "Receiving agent does not exist"
        );

        CryptoAgent fromAgent = CryptoAgent(agents[fromAgentId]);
        CryptoAgent toAgent = CryptoAgent(agents[toAgentId]);

        // Ensure the sender is the owner of the sending agent
        require(
            fromAgent.owner() == msg.sender,
            "Caller is not the owner of the sending agent"
        );

        // Send the message
        toAgent.receiveMessage(message);
    }
}
