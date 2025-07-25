import React from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
    const {pathname} = useResolvedPath();
    const isHomePage = pathname === '/';
    return (
    <div className="bg-background/80 backdrop-blur-lg border-b border-primary/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center px-4 min-h-[4rem] justify-between">
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
              <ShoppingCartIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Product Store</span>
            </Link>
          </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

            {isHomePage && (
                <div className='indicator'>
                    <div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
                        <ShoppingCartIcon className="w-6 h-6 text-primary" />
                        <span className="indicator-item badge badge-secondary">0</span>
                    </div>
                </div>
            )}

        </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
