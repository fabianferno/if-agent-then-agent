import { NextRequest, NextResponse } from 'next/server';
const {
    SignProtocolClient,
    SpMode,
    OffChainSignType,
} = require("@ethsign/sp-sdk");
const { privateKeyToAccount } = require("viem/accounts");

const privateKey = `0x${process.env.PRIVATE_KEY}`;

const schemaId = "SPS_hjADGnEZxD9KS1sUIOA_a"
// [
//     { name: "name", type: "string" },
//     { name: "createdBy", type: "address" },
//     { name: "flowlet", type: "string" },
// ],
export async function POST(req: NextRequest) {
    try {
        let { data, indexingValue } = await req.json();

        console.log(data, indexingValue)

        // TODO: Implement signature logic here
        try {
            // Initialize SignProtocolClient for off-chain attestation
            const client = new SignProtocolClient(SpMode.OffChain, {
                signType: OffChainSignType.EvmEip712,
                account: privateKeyToAccount(privateKey),
            });

            // Create attestation
            const attestationInfo = await client.createAttestation({
                schemaId,
                data: {
                    name: data.name,
                    createdBy: data.createdBy,
                    flowlet: data.flowlet,
                },
                indexingValue,
            });

            console.log("Attestation info:", attestationInfo);

            // Respond with success message and created attestation data
            return NextResponse.json({
                message: "Attestation created successfully",
                attestation: {
                    ...attestationInfo,
                }
            }, { status: 200 });
        } catch (err) {
            console.error("Error creating attestation:", err);
            return NextResponse.json({ error: "Server error", err }, { status: 500 });
        }

        // Placeholder response
        return NextResponse.json({ message: 'Signature created successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in sign API route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'Signature created successfully' }, { status: 200 });
}