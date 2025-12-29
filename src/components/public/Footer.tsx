import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

export function Footer() {
  return (
    <footer className="w-full border-t p-4 bg-white fixed bottom-0">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <span className="text-gray-500 text-sm">
          © 2025 yokila by serenus
        </span>

        {/* Twitter */}
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <IconBrandTwitter style={{ width: 'rem(18)', height: 'rem(18)' }} stroke={1.5} />
          </svg>
        </button>

        {/* YouTube */}
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <IconBrandYoutube style={{ width: 'rem(18)', height: 'rem(18)' }} stroke={1.5} />
          </svg>
        </button>

        {/* Instagram */}
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <IconBrandInstagram style={{ width: 'rem(18)', height: 'rem(18)' }} stroke={1.5} />
          </svg>
        </button>
      </div>
    </footer>
  );
}
