$('.floating-top-btn').fadeOut();
$(window).scroll(function() {
    var wscroll = $(this).scrollTop();
    if (wscroll > 50) {
        $(".navbar").addClass("shrink-nav");
    } else {
        $(".navbar").removeClass("shrink-nav");
    }
    if ($(this).scrollTop()) {
        $('.floating-top-btn').fadeIn();
    } else {
        $('.floating-top-btn').fadeOut();
    }
});

$('.carousel[data-type="multi"] .item').each(function() {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < 2; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});

$(".close-tab").click(function() {
    $("#tabSelect ul li").removeClass("active");
    $(".tab-content .tab-pane").removeClass("active in");
});

$('.btn-show-more').click(function(e) {
    $(this).parent().addClass('show-more');
    e.stopPropagation();
});
$('.btn-show-less').click(function(e) {
    $(this).parent().removeClass('show-more');
    e.stopPropagation();
});

/*$('#reviewCarousel').carousel({
  interval: false
})*/


/*

$('#myCarousel').carousel({
  interval: false,
  wrap: false
})

$('#myCarousel .item').each(function(){
    
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  for (var i=0;i<2;i++) {
    next=next.next();
    if (!next.length) {
    	next = $(this).siblings(':first');
  	}
    
    next.children(':first-child').clone().appendTo($(this));
  }
    
});

*/
var itemsMainDiv = ('.MultiCarousel');
var itemsDiv = ('.MultiCarousel-inner');
var itemWidth = "";

$('.leftLst, .rightLst').click(function() {
    var condition = $(this).hasClass("leftLst");
    if (condition)
        click(0, this);
    else
        click(1, this)
});

ResCarouselSize();




$(window).resize(function() {
    ResCarouselSize();
});

//this function define the size of the items
function ResCarouselSize() {
    var incno = 0;
    var dataItems = ("data-items");
    var itemClass = ('.item');
    var id = 0;
    var btnParentSb = '';
    var itemsSplit = '';
    var sampwidth = $(itemsMainDiv).width();
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function() {
        id = id + 1;
        var itemNumbers = $(this).find(itemClass).length;
        btnParentSb = $(this).parent().attr(dataItems);
        itemsSplit = btnParentSb.split(',');
        $(this).parent().attr("id", "MultiCarousel" + id);


        if (bodyWidth >= 1200) {
            incno = itemsSplit[3];
            itemWidth = sampwidth / incno;
        } else if (bodyWidth >= 992) {
            incno = itemsSplit[2];
            itemWidth = sampwidth / incno;
        } else if (bodyWidth >= 768) {
            incno = itemsSplit[1];
            itemWidth = sampwidth / incno;
        } else {
            incno = itemsSplit[0];
            itemWidth = sampwidth / incno;
        }
        $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
        $(this).find(itemClass).each(function() {
            $(this).outerWidth(itemWidth);
        });

        $(".leftLst").addClass("over");
        $(".rightLst").removeClass("over");

    });
}


//this function used to move the items
function ResCarousel(e, el, s) {
    var leftBtn = ('.leftLst');
    var rightBtn = ('.rightLst');
    var translateXval = '';
    var divStyle = $(el + ' ' + itemsDiv).css('transform');
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
        translateXval = parseInt(xds) - parseInt(itemWidth * s);
        $(el + ' ' + rightBtn).removeClass("over");

        if (translateXval <= itemWidth / 2) {
            translateXval = 0;
            $(el + ' ' + leftBtn).addClass("over");
        }
    } else if (e == 1) {
        var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
        translateXval = parseInt(xds) + parseInt(itemWidth * s);
        $(el + ' ' + leftBtn).removeClass("over");

        if (translateXval >= itemsCondition - itemWidth / 2) {
            translateXval = itemsCondition;
            $(el + ' ' + rightBtn).addClass("over");
        }
    }
    $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
}

//It is used to get some elements from btn
function click(ell, ee) {
    var Parent = "#" + $(ee).parent().attr("id");
    var slide = $(Parent).attr("data-slide");
    ResCarousel(ell, Parent, slide);
}




/*


$(function() {
    $('#reviewCarousel').each(function(){
        $(this).carousel({
            interval: 10000;
        });
    });
});*/

/*
$(document).ready(function () {
	jQuery('.remove-collapsed').click(function (evt) {
		alert('hi');
		$('.navbar-collapse').removeClass('in');
		$("button.navbar-toggle").addClass('collapsed');
	}
});
});*/

$(document).ready(function() {
    $('.remove-collapsed').click(function(event) {
        $('.navbar-collapse').removeClass('in');
        $("button.navbar-toggle").addClass('collapsed');
    });
});