export const isAdmin = (user) => user?.role === 'admin';
export const isArtisan = (user) => user?.role === 'artisan';
export const isBuyer = (user) => user?.role === 'buyer';
