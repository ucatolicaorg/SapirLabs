import { Link } from "react-router-dom";

export function DashboardNavBar () {
    return(
        <>
            <div className="flex items-center h-15 bg-gray-900 border border-neutral-700 rounded">
                <nav className="flex items-center justify-center gap 20">
                    <ul className="flex items-center justify-center gap-20 mx-20">
                        <li>
                            <Link to="/dashboard">Main</Link>
                        </li>
                        <li>
                            <Link to="/subjects">Subjects</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}