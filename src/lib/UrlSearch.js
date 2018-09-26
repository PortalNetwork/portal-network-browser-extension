export default (search=location.search)=> {
	const strUrl = search;
	let getPara, ParaVal;
	let aryPara = [];
	if (strUrl.indexOf('?') !== -1) {
		let getSearch = strUrl.split('?')
		getPara = getSearch[1].split('&')
		for (let i = 0; i < getPara.length; i++) {
			ParaVal = getPara[i].split('=');
			aryPara.push(ParaVal[0]);
			aryPara[ParaVal[0]] = ParaVal[1];
		}
	}
	return aryPara;
}