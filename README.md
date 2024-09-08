# if-agent-then-agent

**if-agent-then-agent** is a tool to create seamless swarmnet flowlets—pipelines that set up multi-agent swarmnet workflows. It allows users to easily create, share, and run flowlets.

## Description

if-then-Agent empowers users to build their own swarm of AI agents. We provide an interface where you can drag and drop agents in the order you want them to interact, specify the goal task you want to achieve, and then start the flow effortlessly. Our Galadriel Flowlet contract keeps track of the agents' interactions and responses, creating a structured flow.

### Key Features

- **Create Flowlets:** Design pipelines with multiple agents that interact according to your specifications.
- **Agent Swarms:** Build and customize your own swarm of agents to perform complex, multi-step tasks.
- **Galadriel Flowlet Contract:** Manages the sequence and interactions of agents, ensuring the flow runs smoothly and as intended.

## How It's Made

1. **Multiple Agents:** Created various agents, including `SocialAgent`, `CryptoAgent`, `DefiAgent`, and `NewsAgent`, each performing unique tasks.
   
2. **Flowlet Contract:** The core component that manages inter-agent communication. The flow designed in the frontend is converted into a schema and then used to create an on-chain swarm of agents for you.

3. **Custom Agent Integration:** Anyone can add their own agent if they adhere to the callback function call required by the Flowlet contract, which keeps track of the agents.

## How It Works

1. **Flow Creation:** Users create a flow in the UI. This flow is converted into a flow schema and provided to the Flowlet contract, which then establishes an Agent Swarm for the flow.

2. **Sequential Execution:** The first agent in the sequence is triggered and executed. The next agent waits for the first agent to provide its inference. Once received, the second agent starts working. This cycle continues until the entire flow completes and the goal is achieved.

## Known Issues

### Bugs in Oracle

- **Code Interpreter Errors:** Sometimes, the code_interpreter fails to work correctly when code that could generate an error is entered. In these cases, the error is not properly returned to the Agent contract in the callback.Stating the contract callback args are not matching.

  ![Screenshot 2024-09-08 at 12 38 55 PM](https://github.com/user-attachments/assets/d1c0c599-ef65-457f-809b-d42954661072)


- **Simple Code Execution Fails:** Occasionally, even simple and correct code, such as a print statement like print(2+1), may throw an error. This behavior is unpredictable, as it sometimes provides the correct response. The (e2e) interepreter needs to be fixed to handle such errors more effectively.

- **Oracle Clutter:** Another major issue is that the oracle starts to clutter when unhandled errors accumulate. The LLM begins to hallucinate, and the addLLMResponse function keeps running continuously for a particular agent call. This eventually clogs the oracle, leading to delays in other calls, which may only be resolved by performing a cold start.

## Collaboration and Future Plans

We are eager to collaborate with the Galadriel team to debug and resolve these issues. Galadriel has significant potential, and we are committed to exploring and developing this it into a fully-fledged product.

