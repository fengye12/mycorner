//分页对象
function CentPage() {
	this.CentNumCount = 8 //设置或获取分页数字导航显示数量 当值为0时不显示分页数字导航
	this.DataCount = 0; //设置或获取数据总数
	this.PageNum = 1; //设置或获取当前页码
	this.CentCount = 1; //设置或获取分页面总数
	this.EachCount = 20; //设置或获取每页数据最大行数
	this.PageStr = ""; //设置或获取分页输出字符串

	this.EventName = "CentPageOper"; //设置或获取事件名称
	this.CentMb = ""; //设置或获取分页总体替换模板
	this.CentTopA = "<li><a href='#' onclick='{$EventName}({$PageNum});return false;' title='转到首页'><b class='s'>首页</b></a></li>"; //设置或获取首页有链接替换模板
	this.CentTopB = "<li><span class='s'>首页</span></li>"; //设置或获取首页无链接替换模板
	this.CentSyyA = "<li class='left'><a href='#' onclick='{$EventName}({$PageNum});return false;'  title='转到第{$PageNum}页'></a></li>"; //设置或获取上一页有链接替换模板
	this.CentSyyB = "<li class='left leftcant'><span></span></li>"; //设置或获取上一页无链接替换模板
	this.CentXyyA = "<li class='right'><a href='#' onclick='{$EventName}({$PageNum});return false;'  title='转到第{$PageNum}页'></a></li>"; //设置或获取下一页有链接替换模板
	this.CentXyyB = "<li class='right rightcant'><span></span></li>"; //设置或获取下一页无链接替换模板
	this.CentEndA = "<li><a href='#' onclick='{$EventName}({$PageNum});return false;' title='转到尾页'><b class='s'>尾页</b></a></li>"; //设置或获取尾页有链接替换模板
	this.CentEndB = "<li><span class='s'>尾页</span></li>"; //设置或获取尾页无链接替换模板
	this.CentDhA = "<li><a href='#' onclick='{$EventName}({$PageNum});return false;'  title='转到第{$PageNum}页'>{$PageNum}</a></li>"; //设置或获取数字导航有链接替换模板
	this.CentDhB = "<li><span>{$PageNum}</span></li>"; //设置或获取数字导航无链接替换模板
	this.CentNumNavParMb = ""; //设置或获取数字导航间隔模板
	this.CentSyz = "<li><a href='#' onclick='{$EventName}({$PageNum});return false;' title='转到第{$PageNum}页'>&sdot;&sdot;&sdot;</a></li>"; //设置或获取上一组替换模板
	this.CentXyz = "<li><a href='#' onclick='{$EventName}({$PageNum});return false;'  title='转到第{$PageNum}页'>&sdot;&sdot;&sdot;</a></li>"; //设置或获取下一组替换模板
	this.centPageStyle="<style>.centPage *{margin:0;padding:0;box-sizing:border-box;}.centPage{border-radius:2px;font-size: 0; display: inline-block; background:#fff;vertical-align: middle; margin-right: 10px; }"
	+".centPage a{ display: inline-block; padding: 10px; vertical-align: middle; }"
	+".centPage span{ display: inline-block; padding: 10px; vertical-align: middle; }"
	+".centPage li{ display: inline-block; font-size: 14px; color: #717171; vertical-align: middle; }"
	+".centPage li:first-child{ border-right: 1px solid #e7e7e7; }"
	+".centPage .s{ color: #b4b4b4; }"
	+".centPage li span{ color: #b4b4b4; }"
	+".centPage li:nth-child(-2){ color: #b4b4b4; }"
	+".centPage li:last-child{ border-left: 1px solid #e7e7e7; }"
	+".centPage li.active a,.centPage li.active span{ background: #108cee; color: #fff; }"
	+".centPage .left a,.centPage .left span{ height: 34px; width: 30px; background: url('left.png') no-repeat center center; }"
	+".centPage .left.leftcant a,.centPage .left.leftcant span{ background: url('leftcant.png') no-repeat center center; }"
	+".centPage .right a,.centPage .right span { height: 34px; width: 30px; background: url('right.png') no-repeat center center; }"
	+".centPage .right.rightcant a,.centPage .right.rightcant span { background: url('rightcant.png') no-repeat center center; }</style>"
	document.write(this.centPageStyle)
};

///初始化分页设置
CentPage.prototype.GetCentPage = function(pnum, dcount, ecount) {
	if(arguments.length > 3) {
		this.EventName = arguments[3];
	}
	if(arguments.length > 4) {
		this.CentMb = arguments[4];
	}else{
		this.CentMb = this.GetCentMb();
	}
	this.PageStr = "";
	this.PageNum = Number(pnum);
	this.DataCount = Number(dcount);
	this.EachCount = Number(ecount);
	if(this.DataCount > 0 && this.EachCount > 0) {
		this.CentCount = Math.ceil(this.DataCount / this.EachCount);
	}
	if(this.CentCount < 1) {
		this.CentCount = 1;
	}
	if(this.PageNum > this.CentCount) {
		this.PageNum = this.CentCount;
	}
	if(this.PageNum < 1) {
		this.PageNum = 1;
	}
	var ReMbStr = this.CentMb;
	var ReStrB = "";

	//首页
	if(this.PageNum > 1) {
		ReStrB = this.CentTopA;
	} else {
		ReStrB = this.CentTopB;
	}
	ReStrB = ReplaceAll(ReStrB, "{$PageNum}", "1");
	ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
	ReMbStr = ReplaceAll(ReMbStr, "{$Top}", ReStrB);

	//上一页
	if(this.CentCount > 1 && this.PageNum > 1 && this.PageNum <= this.CentCount) {
		ReStrB = this.CentSyyA;
	} else {
		ReStrB = this.CentSyyB;
	}
	ReStrB = ReplaceAll(ReStrB, "{$PageNum}", (this.PageNum - 1));
	ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
	ReMbStr = ReplaceAll(ReMbStr, "{$Syy}", ReStrB);

	//组与数字导航
	if(this.CentNumCount > 0 && this.CentCount > 0 && this.CentCount >= this.PageNum) {
	    var PageStartNum = (Math.ceil(this.PageNum / this.CentNumCount) * this.CentNumCount) - this.CentNumCount + 1;

		//上一组
		if(PageStartNum > this.CentNumCount) {
			ReStrB = this.CentSyz;
			ReStrB = ReplaceAll(ReStrB, "{$PageNum}", (PageStartNum - 1));
			ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
			ReMbStr = ReplaceAll(ReMbStr, "{$Syz}", ReStrB);
		} else {
			ReMbStr = ReplaceAll(ReMbStr, "{$Syz}", "");
		}

		//数字导航
		var NumParStr = "";
		for(var i = 0; i < this.CentNumCount; i++) {
			if((PageStartNum + i) <= this.CentCount) {
				if((PageStartNum + i) == this.PageNum) {
					ReStrB = this.CentDhB;
					if(NumParStr != "") {
						NumParStr += this.CentNumNavParMb;
					}
					ReStrB = ReplaceAll(ReStrB, "{$PageNum}", (PageStartNum + i));
					ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
				} else {
					ReStrB = this.CentDhA;
					if(NumParStr != "") {
						NumParStr += this.CentNumNavParMb;
					}
					ReStrB = ReplaceAll(ReStrB, "{$PageNum}", (PageStartNum + i));
					ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
				}
				NumParStr += ReStrB;
			}
		}
		ReMbStr = ReplaceAll(ReMbStr, "{$NumPar}", NumParStr);

		//下一组
		if((PageStartNum + this.CentNumCount) <= this.CentCount) {
			ReStrB = this.CentXyz;
			ReStrB = ReplaceAll(ReStrB, "{$PageNum}", (PageStartNum + this.CentNumCount));
			ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
			ReMbStr = ReplaceAll(ReMbStr, "{$Xyz}", ReStrB);
		} else {
			ReMbStr = ReplaceAll(ReMbStr, "{$Xyz}", "");
		}
	} else {
		ReMbStr = ReplaceAll(ReMbStr, "{$Syz}", "");
		ReMbStr = ReplaceAll(ReMbStr, "{$Xyz}", "");
		ReMbStr = ReplaceAll(ReMbStr, "{$NumPar}", "");
	}

	//下一页链接
	if(this.CentCount > 1 && this.PageNum < this.CentCount) {
		ReStrB = this.CentXyyA;
	} else {
		ReStrB = this.CentXyyB;
	}
	ReStrB = ReplaceAll(ReStrB, "{$PageNum}", (this.PageNum + 1));
	ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
	ReMbStr = ReplaceAll(ReMbStr, "{$Xyy}", ReStrB);

	//尾页
	if(this.CentCount > 1 && this.PageNum < this.CentCount) {
		ReStrB = this.CentEndA;
	} else {
		ReStrB = this.CentEndB;
	}
	ReStrB = ReplaceAll(ReStrB, "{$PageNum}", this.CentCount);
	ReStrB = ReplaceAll(ReStrB, "{$EventName}", this.EventName);
	ReMbStr = ReplaceAll(ReMbStr, "{$End}", ReStrB);

	ReMbStr = ReplaceAll(ReMbStr, "{$DataCount}", this.DataCount);
	ReMbStr = ReplaceAll(ReMbStr, "{$EachCount}", this.EachCount);
	ReMbStr = ReplaceAll(ReMbStr, "{$CentCount}", this.CentCount);
	ReMbStr = ReplaceAll(ReMbStr, "{$PageNum}", this.PageNum)
	PageStr = ReMbStr;
	return PageStr;
};

///分页总体模板
CentPage.prototype.GetCentMb = function() {
	var mb = "";
	mb += "<ul class='centPage'>{$Syy}{$Top}{$Syz}{$NumPar}{$Xyz}{$End}{$Xyy}</ul>";
	mb += "<a style='vertical-align:middle;'>共<b>{$DataCount}</b>条/{$CentCount}页</a>";
	return mb;
};

// 替换所有匹配字符串
function ReplaceAll(s, s1, s2) {
	var exs = new Array(/\\/gi, /\^/gi, /\$/gi, /\{/gi, /\[/gi, /\./gi, /\(/gi, /\*/gi, /\+/gi, /\?/gi, /\!/gi, /\#/gi, /\|/gi);
	var chars = new Array("\\", "^", "$", "{", "[", ".", "(", "*", "+", "?", "!", "#", "|");
	for(i = 0; i < exs.length; i++) {
		s1 = s1.replace(exs[i], "\\" + chars[i]);
	}
	return s.replace(new RegExp(s1, "gm"), s2);
}
