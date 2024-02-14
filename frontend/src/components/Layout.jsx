/* eslint-disable react/prop-types */
export default function Layout({ children }){
    return (
        <div className="animate-opacity relative flex flex-col items-center justify-center h-screen w-full bg-slate-100">
            {children}
        </div>
    )
}