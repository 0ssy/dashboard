export default function TopBar(){

    return(

        <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"40px"
        }}>

            <div>

                <h1>Overview</h1>
                <p>Welcome back.</p>

            </div>

            <div style={{
                display:"flex",
                gap:"20px",
                alignItems:"center"
            }}>

                <input
                placeholder="Search..."
                style={{
                    padding:"15px",
                    width:"250px",
                    border:"4px solid black",
                    borderRadius:"20px",
                    outline:"none"
                }}
                />

                <div style={{
                    width:"60px",
                    height:"60px",
                    background:"#FFD56B",
                    border:"4px solid black",
                    borderRadius:"20px"
                }}>

                </div>

            </div>

        </div>

    )

}