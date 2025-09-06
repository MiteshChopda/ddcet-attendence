
import "./Navbar.css"
import Button from "./Button.jsx"
export default function Navbar(){
	return (
		<div id="myNavbar">
			<div id="partOne">
				{/*"<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.pStGLEHVH0dyZWSe0HghVgHaHa%3Fpid%3DApi&f=1&ipt=140ff2cbed7ce80aeb60864d8bb003ec69c6a2f60f1e6cd5d25acdf9962e2f49&ipo=images" />"*/}
				<h3>DDCET-personal-attendence</h3>
			</div>
			<div id="partTwo">
				<img 
				src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.Au0_7mpqZMtQeoRL4iFkqAHaHa%3Fcb%3Dthfvnext%26pid%3DApi&f=1&ipt=30e132190452e08e29a523b8ea1c6ce4573b570d9209c1404be95a3fd982bd18&ipo=images" />
				<Button text="Home"/>
			</div>	
		</div>
	)
}
