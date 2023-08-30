'use server'
import { NextResponse } from "next/server"

export async function getData(
    { val, pageName, currentYear }:
        { val: string, pageName: string, currentYear?: any }
) {
    const API_KEY = process.env.API_KEY
    const revalidTime = 43200

    if (pageName === 'movies') {
        if (val === 'trending') {
            const response = await fetch(`https://api.themoviedb.org/3/${val}/movie/day?api_key=${API_KEY}`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.results)
            return response
        } else {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=${API_KEY}`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.results)
            return response
        }
    } else if (pageName === 'anime') {
        if (val === 'top anime') {
            const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=24`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === 'top manga') {
            const response = await fetch(`https://api.jikan.moe/v4/top/manga`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === 'upcoming season') {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?limit=24`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === `season winter ${currentYear}`) {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/winter`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === `season spring ${currentYear}`) {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/spring`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === `season summer ${currentYear}`) {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/summer`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === `season fall ${currentYear}`) {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/fall`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else if (val === `season winter ${currentYear + 1}`) {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear + 1}/winter`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        } else {
            const response = await fetch(`https://api.jikan.moe/v4/seasons/now?limit=24`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.data)
            return response
        }
    } else {
        if (val === 'trending') {
            const response = await fetch(`https://api.themoviedb.org/3/${val}/tv/day?api_key=${API_KEY}`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.results)
            return response
        } else {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${val}?api_key=${API_KEY}`, { next: { revalidate: revalidTime } })
                .then(res => res.json())
                .then(data => data.results)
            return response
        }

    }
}