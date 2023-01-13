//// [1] html elment vars ######
let cont = document.getElementById("container"), //main div
	form = document.getElementById("form"), // form head
	inp = document.getElementById("title"), //the place to write
	sub = document.getElementById("sub"), // but to add
	task = document.getElementById("task"); // tasks div
//////////////// [1] children vars ######
let ArrayOfChildren = [];
let RLC = [];
//////////////// [2] scrooling & clear vars ######
let sTT = document.getElementById("top");
let sTB = document.getElementById("bottom");
let cA = document.getElementById("ca");
//////////////// [2] function ######
ATB();
reLs();
reCAB();
// createElements & appendChild & add to arry of Children
function crCh() {
	let mytask = document.createElement("div"),
		mTH = document.createElement("p"),
		btn = document.createElement("button"),
		taskName = document.createTextNode(inp.value),
		del = document.createTextNode("delet");
	//creat id & class
	for (let i = 0; i <= task.children.length; i++) {
		mytask.id = `taskNum-${task.children.length + 1}`;
		mytask.classList.add(
			"mytask",
			`${taskName.textContent.trim().split(" ").join("").slice(0, 3)}-${
				task.children.length + 1
			}`,
		);
		btn.id = `delet-${task.children.length + 1}`;
	}
	btn.className = "del";
	let x = mTH.className;
	//append
	function append() {
		btn.appendChild(del);
		mTH.appendChild(taskName);
		mTH.appendChild(btn);
		mytask.appendChild(mTH);
		//append to body
		task.appendChild(mytask);
		// clear value of inp
		inp.value = "";
	}
	// // add to array of children
	function addToAOC() {
		const myOpj = {
			chId: mytask.id,
			chCN: mytask.className,
			chTxt: taskName.textContent,
			pTCl: mTH.className,
		};
		ArrayOfChildren.push(JSON.stringify(myOpj));
	}
	append();
	addToAOC();

	// add done class to p
	mTH.addEventListener("click", () => {
		done(mTH);
		x += x;

		let myCO = {
			chId: mytask.id,
			chCN: mytask.className,
			chTxt: taskName.textContent,
			pTCl: mTH.className,
		};
		for (let i = 0; i < ArrayOfChildren.length; i++) {
			if (mTH.parentElement.id === JSON.parse(ArrayOfChildren[i])["chId"]) {
				ArrayOfChildren.splice(i, 1, JSON.stringify(myCO));
			}
			addToLocal();
		}
	});
	/////////// remove Task
	btn.addEventListener("click", function reTFLs() {
		for (let i = 0; i < ArrayOfChildren.length; i++) {
			if (
				this.parentElement.parentElement.id ===
				JSON.parse(ArrayOfChildren[i])["chId"]
			) {
				ArrayOfChildren.splice(i, 1);
				addToLocal();
			}
		}
		this.parentElement.parentElement.remove();
		reCAB();
	});
}

//add To localStorage On Submit
function addToLocal() {
	localStorage.setItem("tasks", ArrayOfChildren);
}
//on Click
sub.addEventListener("click", (e) => {
	e.preventDefault();
	if (inp.value !== "") {
		crCh();
	}
	addToLocal();
	reCAB();
});
// add done class to p on click
function done(e) {
	e.classList.toggle("done");
	if (e.classList.contains("done") === true) {
		e.style.cssText = `
				opacity: 50%;
				background: lightseagreen ;
				color: gold;
				padding-right: 100px;
				`;
		e.firstElementChild.style.cssText = `
				background: green;
				padding: 10px 30px;
				`;
		e.firstElementChild.textContent = "clear";
	} else {
		e.style.cssText = "";
		e.firstElementChild.style.cssText = "";
		e.firstElementChild.textContent = "delet";
	}
}
// return from local Storge
function reLs() {
	if (localStorage.getItem("tasks")) {
		let rest = localStorage.getItem("tasks");
		if (rest.length > 0) {
			rest = rest.split("},");
			for (let i = 0; i < rest.length - 1; i++) {
				rest[i] = `${rest[i]}}`;
			}
			for (let i = 0; i < rest.length; i++) {
				let test = JSON.parse(rest[i]);
				RLC.push(test);
			}
		}
	}
}
//add local storge to body

function ATB() {
	reLs();
	RLC.map((e) => {
		inp.value = e.chTxt;
		crCh();
		RLC = [];
	});
}

//////// scrooling
window.onscroll = function () {
	if (scrollY >= 400) {
		sTT.style.display = "block";
		sTB.style.display = "block";
	} else {
		sTT.style.display = "none";
		sTB.style.display = "none";
	}
};
sTT.onclick = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
sTB.onclick = () => {
	window.scrollTo({
		top: window.outerHeight * 2,
		behavior: "smooth",
	});
};
function reCAB() {
	if (task.children.length >= 5) {
		cA.style.display = "block";
	} else {
		cA.style.display = "none";
	}
}
////////clear All
function clearAll() {
	localStorage.removeItem("tasks");
	ArrayOfChildren = [];
}
cA.onclick = () => {
	for (let i = task.children.length; i >= 1; i--) {
		task.firstElementChild.remove();
	}
	clearAll();
	cA.style.display = "none";
};
///////////////////////////////////////// edit % fix

function reco(e) {
	for (let i = 0; i < RLC.length; i++) {
		if (e.children[i].id === RLC[i].chId) {
			return (e.children[i].firstElementChild.className = RLC[i].pTCl);
		}
	}
}
