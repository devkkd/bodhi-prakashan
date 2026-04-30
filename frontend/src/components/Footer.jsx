import React from 'react';
import { categories } from '@/data/categories';
import { subCategories } from '@/data/subCategories';

const Footer = () => {
    // Fetch up to 4 categories dynamically
    const footerCategories = categories.slice(0, 4);

    return (
        <footer className="w-full bg-[#FFE8CC] relative font-sans">

            {/* Top White Wavy Transition (Upside down hero wave) */}
            {/* Top Wave + Blue Line */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">

                {/* WHITE WAVE (background cut) */}
                <svg
                    className="relative block w-full h-[60px] md:h-[100px] lg:h-[140px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,80 C150,40 350,120 600,90 C850,60 1000,120 1200,80 L1200,0 L0,0 Z"
                        fill="#FFFFFF"  // match your top section background
                    />
                </svg>

                {/* BLUE LINE (overlay) */}
                <svg
                    className="absolute top-0 left-0 w-full h-[60px] md:h-[100px] lg:h-[140px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,80 C150,40 350,120 600,90 C850,60 1000,120 1200,80"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                </svg>

            </div>

            {/* Container padding (pt-[100px] md:pt-[140px]) is perfectly matched with 
        the negative top margin of the logo below to keep them connected to the top edge 
      */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-[100px] md:pt-[140px] lg:pt-[160px]">

                {/* --- TOP BAR (Quotes, Logo, WhatsApp) --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center relative z-10 gap-8 lg:gap-6 mb-8">

                    {/* Left Text */}
                    <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-[18px] md:text-[22px] font-extrabold text-black tracking-tight">
                            Books arrive. They stay a while. Then they move on - with you.
                        </h3>
                    </div>

                    {/* Center Logo Badge */}
                    <div className="flex-shrink-0 relative flex justify-center items-center w-[160px] md:w-[200px] lg:w-[220px]">
                        {/* The white badge extending seamlessly down from the white wave */}
                        <div className="absolute -top-[100px] md:-top-[140px] lg:-top-[160px] bg-white rounded-b-[40px] px-6 pb-6 pt-12 md:pt-16 flex justify-center">
                            <img
                                src="/images/mainlogo.svg"
                                alt="Bodhi Logo"
                                className="h-[60px] md:h-[80px] w-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Text & WhatsApp Button */}
                    <div className="flex-1 flex flex-col md:flex-row items-center justify-center lg:justify-end gap-6 text-center lg:text-right">
                        <h3 className="text-[18px] md:text-[22px] font-extrabold text-black tracking-tight">
                            किताबें आती हैं, रुकती हैं, फिर आगे बढ़ जाती हैं।
                        </h3>
                        <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-colors shadow-sm whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>

                </div>

                {/* --- DYNAMIC CATEGORIES SECTION --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8">
                    {footerCategories.map((category) => {
                        const currentSubCategories = subCategories.filter(sub => sub.categoryId === category.id);

                        return (
                            <div key={category.id} className="flex flex-col gap-4">
                                <h4 className="text-[16px] font-bold text-black tracking-wide">
                                    {category.title}
                                </h4>
                                {currentSubCategories.length > 0 && (
                                    <ul className="flex flex-col gap-1">
                                        {currentSubCategories.map((sub) => (
                                            <li key={sub.id}>
                                                <a href={sub.link || "#"} className="text-[14px] text-gray-800 hover:text-black hover:underline transition-all">
                                                    {sub.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* --- BOTTOM LINKS & INFO --- */}
                <div className="border-t border-[#e6d0b6] py-5 flex flex-col lg:flex-row justify-between gap-12">

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 xl:gap-12 flex-1">
                        {/* Col 1: Account */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[15px] font-bold text-black">Account</h4>
                            <ul className="flex flex-col gap-1">
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Profile</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Orders</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Shop</a></li>
                            </ul>
                        </div>

                        {/* Col 2: Quick Links */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[15px] font-bold text-black">Quick Links</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Home page</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">About Us</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Blogs</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Contact us</a></li>
                            </ul>
                        </div>

                        {/* Col 3: Policies */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[15px] font-bold text-black">Policies</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Privacy Policy</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Terms of Service</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Refund Policy</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Shipping Policy</a></li>
                            </ul>
                        </div>

                        {/* Col 4: Follow us */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[15px] font-bold text-black">Follow us</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Facebook</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">Instagram</a></li>
                                <li><a href="#" className="text-[14px] text-gray-800 hover:text-black">YouTube</a></li>
                            </ul>
                        </div>

                        {/* Col 5: Support */}
                        <div className="flex flex-col gap-4 col-span-2 md:col-span-3 xl:col-span-1">
                            <h4 className="text-[15px] font-bold text-black">Support</h4>
                            <ul className="flex flex-col gap-2.5 text-[14px] text-gray-800 leading-relaxed">
                                <li><span className="font-bold text-black">Call :</span> +91 - 9660520078</li>
                                <li><span className="font-bold text-black">Email :</span> bodhiprakashan@gmail.com</li>
                                <li>
                                    <span className="font-bold text-black">Address :</span> 14, केसर नगर A, केसर चौराहा, मुहाना मंडी रोड, केसर स्कूल मोहनपुरा बालाजी रोड गेट, जयपुर, राजस्थान
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Icon Mascot */}
                    <div className="hidden lg:flex justify-center xl:justify-end items-end w-full lg:w-auto flex-shrink-0">
                        <img
                            src="/images/icons/footericon.svg"
                            alt="Bodhi Footer Mascot"
                            className="w-full max-w-[240px] object-contain drop-shadow-sm"
                        />
                    </div>

                </div>

                {/* --- COPYRIGHT SECTION --- */}
                <div className="border-t border-[#e6d0b6] py-3 text-center">
                    <p className="text-[13px] md:text-[14px] text-gray-800 font-medium">
                        Copyright © 2026 | BodhiPrakashan All Rights Reserved. | Crafted and Powered by Kontent Kraft Digital
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;