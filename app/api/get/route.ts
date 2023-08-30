import { NextRequest, NextResponse } from "next/server";

// Just for testing as for now
export async function GET(req: NextRequest) {
    const products = await fetch('https://64eefa46219b3e2873c3b912.mockapi.io/products').then(res => res.json())
    return NextResponse.json(products, {status: 200});
}