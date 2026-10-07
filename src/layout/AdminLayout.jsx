import { IoMdBook } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router";
import { GoGoal, GoTasklist } from "react-icons/go";
import { MdOutlineInsights, MdOutlineTimer } from "react-icons/md";

const AdminLayout = () => {

    const location = useLocation();
    const locationArr = location.pathname.split("/");
    const path = locationArr[locationArr.length-1]
    console.log(path);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">{path}</div>
                </nav>
                {/* Page content here */}
                <div className="p-4"><Outlet/></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                           {/* List item */}
                        <li>
                            <Link to={'/dashboard/task'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Task">
                               <GoTasklist />
                                <span className="is-drawer-close:hidden">Task</span>
                            </Link>
                        </li>

                          {/* List item */}
                        <li>
                            <Link to={'/dashboard/goal'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Goal">
                                <GoGoal />
                                <span className="is-drawer-close:hidden">Goal</span>
                            </Link>
                        </li>

                         {/* List item */}
                        <li>
                            <Link to={'/dashboard/subject'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Subject">
                                {/* Home icon */}
                                <IoMdBook />
                                <span className="is-drawer-close:hidden">Subject</span>
                            </Link>
                        </li>

                          {/* List item */}
                        <li>
                            <Link to={'/dashboard/focus'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Focus">
                                {/* Home icon */}
                               <MdOutlineTimer />
                                <span className="is-drawer-close:hidden">Focus</span>
                            </Link>
                        </li>

                          {/* List item */}
                        <li>
                            <Link to={'/dashboard/insights'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Insights">
                                {/* Home icon */}
                             <MdOutlineInsights />
                                <span className="is-drawer-close:hidden">Insights</span>
                            </Link>
                        </li>


                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;