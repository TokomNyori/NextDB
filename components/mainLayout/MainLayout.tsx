'use client'
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Cards from "./Cards";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import Modal from "../Modal";
import ModalTwo from "../ModalTwo";
import Footer from "../Footer";

export default function MainLayout() {
    const [val, setVal] = useState('popular');
    const [mirrorVal, setMirrorVal] = useState('popular movies');

    const [data, setData] = useState([]);
    const [isSticky, setIsSticky] = useState(false)
    const [loading, setLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [genres, setGenres] = useState([])
    const [currentID, setCurrentID] = useState()
    const [greet, setGreet] = useState(false)
    const API_KEY = "88477ce165409d6acab148e6bbcff0a7"

    useEffect(() => {
        try {
            setLoading(true)
            toast.promise(
                // axios.get('/api/get/', { params: { val } })
                //     .then(res => {
                //         setData(res.data)
                //         setLoading(false)
                //         scrollToTop()
                //     }),
                workingWithData(),
                {
                    loading: 'Loading...',
                    success: <b className="capitalize">{mirrorVal}</b>,
                    error: <b>Server Error.</b>,
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#1D202A',
                        color: '#CBD5E1',
                        zIndex: 100,
                    },
                    success: {
                        duration: 2000,
                    },
                }
            );
        } catch (error: any) {
            toast.error("This didn't work.", {
                duration: 2000,
            })
        }
    }, [val])

    useEffect(() => {
        setLoading(true)
        // axios.get('/api/get/', { params: { currentID, val } })
        //     .then(res => {
        //         setGenres(res.data)
        //         setLoading(false)
        //     })
        if (val === 'tv_popular') {
            fetch(`https://api.themoviedb.org/3/tv/${currentID}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setLoading(false)
                    setGenres(data.genres)
                })
        } else {
            fetch(`https://api.themoviedb.org/3/movie/${currentID}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setLoading(false)
                    setGenres(data.genres)
                })
        }
    }, [currentID])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 100; // Adjust this value as needed

            if (scrollTop > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    })

    async function workingWithData() {
        if (val === 'trending') {
            let result = await fetch(`https://api.themoviedb.org/3/${val}/movie/day?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.results)
                    setLoading(false)
                    scrollToTop()
                })
        } else if (val === 'tv_popular') {
            let result = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.results)
                    setLoading(false)
                    scrollToTop()
                })
        } else {
            const result = await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.results)
                    setLoading(false)
                    scrollToTop()
                })
        }
    }

    function changeCategory(event: any) {
        setVal(event.target.value)
        if (event.target.value === 'top_rated') {
            setMirrorVal('top rated movies')
        } else if (event.target.value === 'now_playing') {
            setMirrorVal('now playing (movies)')
        } else if (event.target.value === 'tv_popular') {
            setMirrorVal('popular tv series')
        } else {
            setMirrorVal(event.target.value + ' movies')
        }
    }

    function changeModal(event: any, id: any) {
        setModalState(true)
        setCurrentID(id)
    }

    function closeModal(event: any) {
        setModalState(false)
    }

    function greetings() {
        setGreet(prevState => !prevState)
    }

    const scrollToTop = () => {
        const duration = 1000; // Adjust the duration of the scroll animation
        const startTime = performance.now();
        const startPosition = window.pageYOffset;

        const easingFunction = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFunction(progress);
            const newPosition = startPosition + (0 - startPosition) * easedProgress;

            window.scrollTo(0, newPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };



    const movieData = data.map(item => {
        return (
            <Cards
                id={item['id']}
                key={item['id']}
                title={val === 'tv_popular' ? item['name'] : item['title']}
                poster_path={item['poster_path']}
                overview={item['overview']}
                release_date={item['release_date']}
                vote_average={item['vote_average']}
                vote_count={item['vote_count']}
                adult={item['adult']}
                original_language={item['original_language']}
                changeModal={changeModal}
            />
        )
    })

    return (
        <div className="flex flex-col justify-center items-center">
            {
                loading &&
                <div className='modal-blur inset-0 bg-black bg-opacity-30
                        flex justify-center items-center fixed flex-wrap transition duration-150 ease-out z-50'>
                    <ScaleLoader
                        color={"#1FDF64"}
                        loading={loading}
                        // @ts-ignore
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>

            }
            <div className='greet absolute top-4 sm:top-2 lg:right-15 lg:top-5 right-4 sm:right-10 cursor-pointer' onClick={greetings}>
                Hi ✋🏻
            </div>
            <div className='logo-container'>
                <h1 className='logo-main'>BextDB</h1>
            </div>
            <div className={`sorting-nav my-6 ml-2 flex gap-2 items-center ${isSticky ? 'fixed-nav' : ''}`}>
                <h1>Sort</h1>
                <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                    name="categories" id="" value={val} onChange={changeCategory}>
                    <option value="popular">Popular</option>
                    <option value="top_rated">Top Rated</option>
                    <option value="now_playing">Now Playing</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="trending">Trending</option>
                    <option value="tv_popular">⬆ TV Series</option>
                </select>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-2 md:px-6 lg:px-12">
                {movieData}
            </div>
            <Toaster />
            <Modal
                movies={data} currentID={currentID}
                modalState={modalState} closeModal={closeModal}
                val={val}
                genres={genres}
                key={currentID}
            />
            <ModalTwo greet={greet} greetings={greetings} />
            <Footer />
        </div>
    )
}