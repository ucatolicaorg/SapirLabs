import { Link } from "react-router-dom";
import { DashboardNavBar } from "../components/dashBoardNav";

export function Subjects () {
    return(
        <> 
            <DashboardNavBar></DashboardNavBar>

            <div className="flex items-center justify-center gap-30 my-20">
                
                <Link to="/math">
                    <img src="https://cdn-icons-png.flaticon.com/512/4720/4720458.png" alt="math icon" />
                Maths
                </Link>

                <Link to="/english">
                    <img src="https://cdn-icons-png.flaticon.com/512/5511/5511398.png" alt="english icon" />
                English
                </Link>

                <Link to="/coding">
                    <img src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-512.png" alt="coding icon" />
                Coding
                </Link>
            </div>

        </>
    );
}