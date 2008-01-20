var ThemePicker = 
{
	theme:
	[
		{
			'category' : 'Birthdays',
			'movies' :
			[
					{'name':'Happy Birthday 1','movie' : 'http://localhost/scrapstimeout/birthday1.swf', 'width' : '600', 'height': '215', 'preview' : 'birthday1.jpg'},
					{'name':'Happy Birthday 2','movie' : 'http://localhost/scrapstimeout/birthday2.swf', 'width' : '600', 'height': '215', 'preview' : 'birthday2.jpg'},
					{'name':'Birthday Wishes 3','movie' : 'http://localhost/scrapstimeout/birthday3.swf', 'width' : '600', 'height': '215', 'preview' : 'birthday3.jpg'},
					{'name':'Birthday Wishes 4','movie' : 'http://localhost/scrapstimeout/birthday4.swf', 'width' : '600', 'height': '215', 'preview' : 'birthday4.jpg'}
			]
		},
		
		{
			'category' : 'New Year Greetings',
			'movies' :
			[
				{'name':'New Year - Theme 1','movie' : 'http://localhost/scrapstimeout/general.swf?bg=http://localhost/scrapstimeout/newyear1.jpg&', 'width' : '600', 'height': '215', 'preview' : 'newyear1.jpg'},
				{'name':'New Year - Theme 2','movie' : 'http://localhost/scrapstimeout/general.swf?bg=http://localhost/scrapstimeout/newyear2.jpg&', 'width' : '600', 'height': '215', 'preview' : 'newyear2.jpg'}
			]			
		},
		{
			'category' : 'Christmas Greetings',
			'movies' :
			[
				{'name':'Merry Christmas','movie' : 'http://localhost/scrapstimeout/christmas1.swf', 'width' : '600', 'height': '215', 'preview' : 'christmas.jpg' },
				{'name':'Happy Carols','movie' : 'http://localhost/scrapstimeout/christmas2.swf', 'width' : '488', 'height': '318', 'preview' : 'christmas2.jpg'}
			]			
		}
	],

	currentTheme : 0,
	
	init : function(themeDiv, previewDiv)
	{
		var docPos = "<ul>";
		for (var i = 0; i < this.theme.length; i++)
		{
			docPos += "<li><a href = 'javascript:ThemePicker.showCategory("+ i+ ")'>" + this.theme[i].category + "</a>"; 
			docPos += "<div style = 'padding : 1px;display : none; width : 100%' id = 'themeCategory_" + i+ "'>";
			docPos += "<ul style = 'list-style : none; padding : 1px;'>"
			for (var j = 0; j < this.theme[i].movies.length; j++)
			{
				docPos += '<li class = "message-text" style = "font-size :12px;cursor:pointer" onclick = "ThemePicker.selectTheme(' + i + "," + j + ')" onmouseover = "ThemePicker.previewTheme(' + i + "," + j + ')">';
				docPos += '<input name = "theme" type = "radio" id = "theme_radio_' + i + '_' + j + '">';
				docPos += this.theme[i].movies[j].name + '</li>';
			}
			docPos += "</ul></div></li>"
		}
		docPos += "</ul>"

		this.themeDiv = document.getElementById(themeDiv);
		this.themePreview = document.getElementById(previewDiv);
		this.themeDiv.innerHTML = docPos;
		
		// setting the initial parameters
		this.showCategory(0);
		this.selectTheme(0,0);

	},
	
	showCategory : function(category)
	{
		for (var i = 0; i < this.theme.length; i++)
		{
			document.getElementById("themeCategory_" + i).style.display = "none";
		}
		document.getElementById("themeCategory_" + category).style.display = "";
	},
	
	previewTheme : function(category, themeIndex)
	{
		this.themePreview.innerHTML = "<img src = 'img/blank.jpg' width = '330' height = '200'>";
		this.themePreview.innerHTML = "<img src = '" + this.theme[category].movies[themeIndex].preview + "' width = '330' height = '200'>"
	},

	selectTheme : function(category, themeIndex)
	{
		this.currentTheme = this.theme[category].movies[themeIndex];
		document.getElementById("theme_radio_" + category + "_" + themeIndex).checked = "checked";
		this.previewTheme(category, themeIndex);
	}
};
