export default function Header() {
    return (
        <div className="p-4">
            <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/100x40" alt="Company Logo" className="h-10" />
                    <nav className="flex space-x-6">
                        <a href="#" className="text-gray-600 hover:text-black">Module</a>
                        <a href="#" className="text-gray-600 hover:text-black">Purchase order</a>
                        <a href="#" className="text-gray-600 hover:text-black">Invoices</a>
                        <a href="#" className="text-gray-600 hover:text-black">Budgets</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <i className="fas fa-bell text-gray-600"></i>
                    <i className="fas fa-envelope text-gray-600"></i>
                    <img src="https://placehold.co/40x40" alt="User Avatar" className="h-10 w-10 rounded-full" />
                </div>
            </header>
        </div>
    )
}