import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const API_KEY = process.env.API_KEY;
    const val = req.nextUrl.searchParams.get("val");
    const currentID = req.nextUrl.searchParams?.get("currentID");
    if (currentID) {
        if (val === 'tv_popular') {
            try {
                let result = await fetch(`https://api.themoviedb.org/3/tv/${currentID}?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(data => data.genres)
                return NextResponse.json(result);
            } catch (error: any) {
                return NextResponse.json(error, {
                    status: 500,
                });
            }
        }
        try {
            let result = await fetch(`https://api.themoviedb.org/3/movie/${currentID}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => data.genres)
            return NextResponse.json(result);
        } catch (error: any) {
            return NextResponse.json(error, {
                status: 500,
            });
        }
    }
    if (val === 'trending') {
        let result = await fetch(`https://api.themoviedb.org/3/${val}/movie/day?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => data.results)
        return NextResponse.json(result);
    }
    if (val === 'tv_popular') {
        let result = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => data.results)
        return NextResponse.json(result);
    }
    const result = await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => data.results)
    return NextResponse.json(result);
}