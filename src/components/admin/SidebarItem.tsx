import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  item: any;
};

const SidebarItem = ({ item }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const hasLinks = item.links && item.links.length > 0;
    const isActive = item.link && location.pathname === item.link;

    const [open, setOpen] = useState<string | null>(null);
    
    useEffect(() => {
        if(item && item.links){
            item.links.map((item: any) => {
                if(item.link === location.pathname){
                    setOpen(item.label)
                }
            })
        }
    }, [item])

    return (
        <div>
            {/* MAIN ITEM */}
            <button
                type="button"
                onClick={() => {
                if (hasLinks) {
                    setOpen(open === item.label ? null : item.label);
                } else if (item.link) {
                    navigate(item.link);
                }
                }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition
                ${
                    isActive
                    ? "bg-pink-400 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
                <div className="flex items-center gap-3">
                    <img src={`/${item.icon}`} alt="add" width={30} height={30} />  
                <span>{item.label}</span>
                </div>

                {hasLinks && (
                    <>
                        {open ? (
                            <img src={`/arrow-bottom.svg`} alt="add" width={30} height={30} />
                        ) : (
                            <img src={`/arrow-right.svg`} alt="add" width={30} height={30} />
                        )}
                    </>
                )}
            </button>
            {/* SUB MENU */}
            {hasLinks && open && (
                <div className="ml-6 mt-1 space-y-1">
                    {item.links.map((sub: any) => {
                    const subActive = location.pathname === sub.link;
                    return (
                        <button
                        key={`sub-${item.label}-${sub.label}`}
                        onClick={() => navigate(sub.link)}
                        className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition
                            ${
                            subActive
                                ? "bg-pink-400 text-white"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                        <img src={`/${sub.icon}`} alt="add" width={30} height={30} />  
                        <span>{sub.label}</span>
                        </button>
                    );
                    })}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
