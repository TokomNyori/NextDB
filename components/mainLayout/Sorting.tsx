'use client'

interface SortingProps {
    val: string,
    pageName: string,
    isSticky: boolean,
    changeCategory: any,
    currentYear?: any
}

const Sorting: React.FC<SortingProps> = ({ pageName, val, changeCategory, isSticky, currentYear }) => {

    let select: any
    if (pageName === 'movies') {
        select =
            <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                name="categories" id="" value={val} onChange={changeCategory}>
                <option value="trending">Trending</option>
                <option value="top_rated">Top Rated</option>
                <option value="popular">Popular</option>
                <option value="now_playing">Now Playing</option>
                <option value="upcoming">Upcoming</option>
            </select>
    } else if (pageName === 'anime') {
        select =
            <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                name="categories" id="" value={val} onChange={changeCategory}>
                <option value="current season">Current Season</option>
                <option value="upcoming season">Upcoming Season</option>
                <option value={`season winter ${currentYear}`}>Season: Winter</option>
                <option value={`season spring ${currentYear}`}>Season: Spring</option>
                <option value={`season summer ${currentYear}`}>Season: Summer</option>
                <option value={`season fall ${currentYear}`}>Season: Fall</option>
                <option value={`season winter ${currentYear + 1}`}>Season: Winter {currentYear + 1}</option>
                <option value="top anime">Top Anime</option>
                <option value="top manga">Top Manga</option>
            </select>
    } else {
        select =
            <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                name="categories" id="" value={val} onChange={changeCategory}>
                <option value="trending">Trending</option>
                <option value="top_rated">Top Rated</option>
                <option value="popular">Popular</option>
                <option value="on_the_air">On the Air</option>
            </select>
    }

    return (
        <div className={`sorting-nav my-6 ml-2 flex gap-2 items-center 
                            ${isSticky ? 'fixed-nav' : ''}`}>
            <h1>Sort:</h1>
            {select}
        </div>
    )
}

export default Sorting