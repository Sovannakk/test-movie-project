'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft, FaCalendar, FaClock, FaTicketAlt } from 'react-icons/fa';

const AVAILABLE_TIMES = [
    { id: 1, time: "10:00 AM", available: true },
    { id: 2, time: "1:00 PM", available: true },
    { id: 3, time: "4:00 PM", available: true },
    { id: 4, time: "7:00 PM", available: true },
    { id: 5, time: "10:00 PM", available: true },
];

const TICKET_PRICE = 5;

export default function BookingPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        selectedTime: '',
        numberOfTickets: 1
    });

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [step, setStep] = useState(1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTimeSelect = (time: string) => {
        setFormData(prev => ({
            ...prev,
            selectedTime: time
        }));
    };

    const handleSeatToggle = (seat: string) => {
        setSelectedSeats(prev => {
            if (prev.includes(seat)) {
                return prev.filter(s => s !== seat);
            } else if (prev.length < Number(formData.numberOfTickets)) {
                return [...prev, seat];
            } else {
                alert(`You can only select ${formData.numberOfTickets} seat${formData.numberOfTickets > 1 ? 's' : ''}`);
                return prev;
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const currentCount = Number(urlParams.get('bookingCount')) || 0;
        const newCount = currentCount + 1;
        router.push(`/?bookingCount=${newCount}`);

        alert('Booking submitted successfully!');

    };

    const totalPrice = TICKET_PRICE * selectedSeats.length;

    const renderSeats = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
        const seatsPerRow = 8;

        return (
            <div className="grid gap-6">
                <div className="w-full bg-white/5 h-2 rounded-full mb-8" />
                {rows.map(row => (
                    <div key={row} className="flex justify-center gap-2">
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                            const seatNumber = `${row}${i + 1}`;
                            const isSelected = selectedSeats.includes(seatNumber);
                            const isDisabled = !isSelected && selectedSeats.length >= Number(formData.numberOfTickets);

                            return (
                                <button
                                    key={seatNumber}
                                    onClick={() => handleSeatToggle(seatNumber)}
                                    disabled={isDisabled}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium
                                        ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/5'}
                                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}
                                        transition-all duration-200`}
                                >
                                    {seatNumber}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white py-16">
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group mb-8"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                        <FaArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Back</span>
                </button>

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <h1 className="text-3xl font-bold mb-2 text-center">Book Movie Tickets</h1>

                    <div className="flex items-center justify-center mb-12">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${step === s ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'}`}>
                                    {s}
                                </div>
                                {s < 3 && <div className="w-16 h-0.5 bg-white/10" />}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="space-y-8">
                            <div>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full pl-10 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-4">
                                    Available Show Times
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {AVAILABLE_TIMES.map((t) => (
                                        <button
                                            key={t.id}
                                            disabled={!t.available}
                                            onClick={() => handleTimeSelect(t.time)}
                                            className={`p-4 rounded-xl flex items-center justify-center space-x-2
                                                ${formData.selectedTime === t.time ? 'bg-blue-500 text-white' : 'bg-white/5'}
                                                ${!t.available ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}
                                                transition-all duration-200`}
                                        >
                                            <FaClock className="w-4 h-4" />
                                            <span>{t.time}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-4">
                                    Number of Tickets
                                </label>
                                <select
                                    name="numberOfTickets"
                                    value={formData.numberOfTickets}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white' }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                        <option
                                            key={num}
                                            value={num}
                                            className="bg-[#121212] text-white"
                                            style={{ backgroundColor: '#121212', color: 'white' }}
                                        >
                                            {num} {num === 1 ? 'Ticket' : 'Tickets'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.date || !formData.selectedTime}
                                className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-white/5 disabled:cursor-not-allowed
                                    rounded-xl font-semibold transition-colors mt-8"
                            >
                                Continue to Seat Selection
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <p className="text-white/60">
                                    Select {formData.numberOfTickets} {formData.numberOfTickets === 1 ? 'seat' : 'seats'}
                                </p>
                                <p className="text-sm text-white/40">Screen this way</p>
                            </div>

                            <p className="text-center text-sm text-white/50">
                                {selectedSeats.length} of {formData.numberOfTickets} {formData.numberOfTickets === 1 ? 'seat' : 'seats'} selected
                            </p>

                            {renderSeats()}

                            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl mt-8">
                                <div>
                                    <p className="text-sm text-white/60">Selected Seats</p>
                                    <p className="font-medium">{selectedSeats.join(', ') || 'None'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-white/60">Total Price</p>
                                    <p className="font-medium">${totalPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-1/2 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={selectedSeats.length !== Number(formData.numberOfTickets)}
                                    className="w-1/2 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-white/5 disabled:cursor-not-allowed
                                        rounded-xl font-semibold transition-colors"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white/5 rounded-xl p-4 mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <FaCalendar className="text-white/60" />
                                        <span>{formData.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaClock className="text-white/60" />
                                        <span>{formData.selectedTime}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaTicketAlt className="text-white/60" />
                                        <span>{selectedSeats.join(', ')}</span>
                                    </div>
                                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-1/2 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    )
}
