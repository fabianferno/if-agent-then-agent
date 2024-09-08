import assert from "assert";
import { 
  TestHelpers,
  Flowlet_AgentResponse
} from "generated";
const { MockDb, Flowlet } = TestHelpers;

describe("Flowlet contract AgentResponse event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for Flowlet contract AgentResponse event
  const event = Flowlet.AgentResponse.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("Flowlet_AgentResponse is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await Flowlet.AgentResponse.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualFlowletAgentResponse = mockDbUpdated.entities.Flowlet_AgentResponse.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedFlowletAgentResponse: Flowlet_AgentResponse = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      flowId: event.params.flowId,
      agent: event.params.agent,
      result: event.params.result,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualFlowletAgentResponse, expectedFlowletAgentResponse, "Actual FlowletAgentResponse should be the same as the expectedFlowletAgentResponse");
  });
});
