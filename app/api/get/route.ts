import { NextRequest, NextResponse } from "next/server";
import { users } from "@/app/libs/datas";

export async function GET(req: NextRequest) {
    return NextResponse.json(users, {status: 200});
}