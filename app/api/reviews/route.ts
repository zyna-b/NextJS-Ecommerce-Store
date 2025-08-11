import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const adminApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

    try {
        const response = await fetch(adminApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...body,
                userId,
            }),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return NextResponse.json({ message: "Missing Product ID" }, { status: 400 });
    }

    const adminApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reviews?productId=${productId}`;
    try {
        const response = await fetch(adminApiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const { reviewId } = body;

    if (!reviewId) {
        return NextResponse.json({ message: "Missing Review ID" }, { status: 400 });
    }

    const adminApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`;

    try {
        const response = await fetch(adminApiUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}

