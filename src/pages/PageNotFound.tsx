import { NavLink } from "react-router-dom";

// Page not found  
function PageNotFound() {
    return (
        <main className="mainBackgroundColor 
        min-h-screen
        flex items-center 
        justify-center 
        px-4 py-16 
        sm:px-6 
        lg:px-8">
            <div className="text-center max-w-xl">
                <p className="text-4xl 
                sm:text-5xl 
                font-extrabold 
                text-amber-500">404</p>

                <h1 className="mt-4
                 text-3xl
                 sm:text-4xl 
                 md:text-5xl 
                 lg:text-6xl 
                 font-bold 
                 tracking-tight 
               text-white">
                    Page not found !
                </h1>

                <p className="mt-4 text-base sm:text-lg text-gray-400">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>

                <div className="mt-6 
                flex 
                flex-col 
                sm:flex-row 
                items-center 
                justify-center 
                gap-4">
                    <NavLink
                        to="/"
                        className="rounded-md 
                        bg-amber-500 
                        px-5 
                        py-3 
                        text-sm 
                        sm:text-base 
                        font-semibold
                      text-white 
                        shadow-md
                        hover:bg-amber-600 
                        transition"
                    >
                        Go back home
                    </NavLink>
                    <NavLink
                        to="/"
                        className="text-sm 
                        sm:text-base 
                        font-medium
                      text-gray-300 
                      hover:text-white 
                      transition">
                        Contact support <span>&rarr;</span>
                    </NavLink>
                </div>
            </div>
        </main>
    );
}

export default PageNotFound;
