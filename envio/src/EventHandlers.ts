/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  Flowlet,
  Flowlet_AgentResponse,
  Flowlet_AgentTriggered,
  Flowlet_FlowCompleted,
  Flowlet_FlowCreated,
} from "generated";

Flowlet.AgentResponse.handler(async ({ event, context }) => {
  const entity: Flowlet_AgentResponse = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    flowId: event.params.flowId,
    agent: event.params.agent,
    result: event.params.result,
  };

  context.Flowlet_AgentResponse.set(entity);
});


Flowlet.AgentTriggered.handler(async ({ event, context }) => {
  const entity: Flowlet_AgentTriggered = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    flowId: event.params.flowId,
    agent: event.params.agent,
    runId: event.params.runId,
  };

  context.Flowlet_AgentTriggered.set(entity);
});


Flowlet.FlowCompleted.handler(async ({ event, context }) => {
  const entity: Flowlet_FlowCompleted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    flowId: event.params.flowId,
  };

  context.Flowlet_FlowCompleted.set(entity);
});


Flowlet.FlowCreated.handler(async ({ event, context }) => {
  const entity: Flowlet_FlowCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    flowId: event.params.flowId,
    owner: event.params.owner,
  };

  context.Flowlet_FlowCreated.set(entity);
});

