import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";

export default function Dashboard(){

    return(

        <div style={{
            flex:1,
            padding:"40px"
        }}>

            <TopBar/>

            <div style={{
                display:"flex",
                gap:"20px"
            }}>

                <StatCard
                title="Revenue"
                value="$12,400"
                color="#CDE990"
                />

                <StatCard
                title="Users"
                value="532"
                color="#FFD56B"
                />

                <StatCard
                title="Tasks"
                value="28"
                color="#FFB37A"
                />

                <StatCard
                title="Clients"
                value="17"
                color="#FFF3B0"
                />

            </div>

            <RevenueChart/>

        </div>

    )

}