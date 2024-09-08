export const SOCIAL_AGENT_CONTRACT_ADDRESS =
  "0x9bF1e95920FDf86718050eE6792Ba4398cE523Ee";
export const CRYPTO_AGENT_CONTRACT_ADDRESS =
  "0x38B3eCA9F61B80910B56Be2fBDf54Af69AFFFAE7";
export const NEWS_AGENT_CONTRACT_ADDRESS =
  "0x93E16272075c13f2553aA0633617EF4e57fF21e8";

export const FLOWLET_CONTRACT_ADDRESS =
  "0x019B88F1B886e0e4032270C4DdEe27fb3F13B6FC";

export const FLOWLET_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "result",
        type: "string",
      },
    ],
    name: "AgentResponse",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "AgentTriggered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
    ],
    name: "FlowCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "FlowCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "flowCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "flows",
    outputs: [
      {
        internalType: "uint256",
        name: "currentAgentIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isFinished",
        type: "bool",
      },
      {
        internalType: "string",
        name: "mainContext",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        internalType: "string",
        name: "result",
        type: "string",
      },
    ],
    name: "onAgentRunCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "agentAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "agentContext",
            type: "string",
          },
        ],
        internalType: "struct FakeFlowlet.AgentsTask[]",
        name: "agents",
        type: "tuple[]",
      },
      {
        internalType: "string",
        name: "_mainContext",
        type: "string",
      },
    ],
    name: "startFlow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const SOCIAL_AGENT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOracleAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "systemPrompt",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "AgentRunCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "OracleAddressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "agentRuns",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "flowletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "responsesCount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "max_iterations",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "is_finished",
        type: "bool",
      },
      {
        internalType: "string",
        name: "user_query",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "agentId",
        type: "uint256",
      },
    ],
    name: "getMessageHistoryContents",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "agentId",
        type: "uint256",
      },
    ],
    name: "getMessageHistoryRoles",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "isRunFinished",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "response",
        type: "string",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleFunctionResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "string",
            name: "functionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "functionArguments",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "created",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
          {
            internalType: "string",
            name: "systemFingerprint",
            type: "string",
          },
          {
            internalType: "string",
            name: "object",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "completionTokens",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "promptTokens",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "totalTokens",
            type: "uint32",
          },
        ],
        internalType: "struct IOracle.OpenAiResponse",
        name: "response",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleOpenAiLlmResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prompt",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "user_query",
        type: "string",
      },
      {
        internalType: "string",
        name: "fname",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "max_iterations",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "flowletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
    ],
    name: "runAgent",
    outputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "setOracleAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CRYPTO_AGENT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOracleAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "systemPrompt",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "AgentRunCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "OracleAddressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "agentRuns",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "flowletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "responsesCount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "max_iterations",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "is_finished",
        type: "bool",
      },
      {
        internalType: "string",
        name: "user_query",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "agentId",
        type: "uint256",
      },
    ],
    name: "getMessageHistoryContents",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "agentId",
        type: "uint256",
      },
    ],
    name: "getMessageHistoryRoles",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "isRunFinished",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "response",
        type: "string",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleFunctionResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "string",
            name: "functionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "functionArguments",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "created",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
          {
            internalType: "string",
            name: "systemFingerprint",
            type: "string",
          },
          {
            internalType: "string",
            name: "object",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "completionTokens",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "promptTokens",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "totalTokens",
            type: "uint32",
          },
        ],
        internalType: "struct IOracle.OpenAiResponse",
        name: "response",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleOpenAiLlmResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prompt",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "user_query",
        type: "string",
      },
      {
        internalType: "string",
        name: "fname",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "max_iterations",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "flowletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
    ],
    name: "runAgent",
    outputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "setOracleAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const NEWS_AGENT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOracleAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "systemPrompt",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "AgentRunCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "OracleAddressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "agentRuns",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "flowletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "responsesCount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "max_iterations",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "is_finished",
        type: "bool",
      },
      {
        internalType: "string",
        name: "user_query",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "agentId",
        type: "uint256",
      },
    ],
    name: "getMessageHistoryContents",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "agentId",
        type: "uint256",
      },
    ],
    name: "getMessageHistoryRoles",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
    ],
    name: "isRunFinished",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "response",
        type: "string",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleFunctionResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "runId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "string",
            name: "functionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "functionArguments",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "created",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
          {
            internalType: "string",
            name: "systemFingerprint",
            type: "string",
          },
          {
            internalType: "string",
            name: "object",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "completionTokens",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "promptTokens",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "totalTokens",
            type: "uint32",
          },
        ],
        internalType: "struct IOracle.OpenAiResponse",
        name: "response",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleOpenAiLlmResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prompt",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "user_query",
        type: "string",
      },
      {
        internalType: "string",
        name: "topic",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "max_iterations",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "flowletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flowId",
        type: "uint256",
      },
    ],
    name: "runAgent",
    outputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "setOracleAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
