'use client';

import { featuredMovies } from '@/data/ActionData';
import { Movie } from '@/types/Movie';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

const WatchPage = () => {
    const router = useRouter();
    const params = useParams();

    const id = params?.id as string;
    const movieId = Number(id);

    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [isWatching, setIsWatching] = useState(false);

    const movie: Movie | undefined = featuredMovies.find((m) => m.id === movieId);

    if (!movie) {
        return <div className="text-white p-10">Movie not found.</div>;
    }

    const handleRatingSubmit = () => {
        alert('Thank you for rating the movie!');
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Video Player */}
            <div className="relative aspect-video bg-gray-900">
                {!isWatching ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={() => setIsWatching(true)}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center space-x-2 transition-colors"
                        >
                            <span className="text-xl">▶</span>
                            <span className="font-semibold">Start Watching</span>
                        </button>
                    </div>
                ) : (
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <p className="text-white/60">Video Player Placeholder</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Movie Info and Rating */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-white/60 hover:text-white mb-8 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Movie
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Movie Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                        <div className="flex items-center space-x-4 text-white/60 mb-6">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.duration}</span>
                            <span>•</span>
                            <span>{movie.genre}</span>
                        </div>
                        <p className="text-white/80 leading-relaxed">{movie.description}</p>
                    </div>

                    {/* Rating Section */}
                    <div className="md:w-80">
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                            <h2 className="text-xl font-semibold mb-4">Rate this Movie</h2>
                            <div className="flex items-center space-x-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                    >
                                        <FaStar
                                            className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                ? 'text-yellow-400'
                                                : 'text-white/20'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleRatingSubmit}
                                disabled={rating === 0}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
