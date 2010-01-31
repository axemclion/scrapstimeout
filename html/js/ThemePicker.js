var __BASE__ = "http://axemclion.github.com/scrapstimeout/";
var ThemePicker = {
    theme: [{
        'category': 'General',
        'movies': [{
            'name': 'Blank Theme',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=" + __BASE__ + "swf/assets/blank.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/blank.jpg'
        }, {
            'name': 'Royal Stars',
            'movie': __BASE__ + "swf/bin/general.swf?bg=" + __BASE__ + "swf/assets/general1.jpg&",
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/general1.jpg'
        }, {
            'name': 'Lanterns',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'swf/assets/general2.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/general2.jpg'
        }, {
            'name': 'Flowers',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'swf/assets/general3.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/general3.jpg'
        }, ]
    }, {
        'category': 'Birthdays',
        'movies': [{
            'name': 'Happy Birthday 1',
            'movie': __BASE__ + 'swf/bin/birthday1.swf',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/birthday1.jpg'
        }, {
            'name': 'Happy Birthday 2',
            'movie': __BASE__ + 'swf/bin/birthday2.swf',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/birthday2.jpg'
        }, {
            'name': 'Birthday Wishes 3',
            'movie': __BASE__ + 'swf/bin/birthday3.swf',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/birthday3.jpg'
        }, {
            'name': 'Birthday Wishes 4',
            'movie': __BASE__ + 'swf/bin/birthday4.swf',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/birthday4.jpg'
        }]
    }, {
        'category': 'Valentine\'s Day',
        'movies': [{
            'name': 'Golden Heart',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'valentine1.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/valentine1.jpg'
        }, {
            'name': 'Prepared for the Valentine',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'valentine2.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/valentine2.jpg'
        }, {
            'name': 'For that special person',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'valentine3.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/valentine3.jpg'
        }, {
            'name': 'He and She',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'valentine4.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/valentine4.jpg'
        }]
    }, {
        'category': 'New Year Greetings',
        'movies': [{
            'name': 'New Year - Theme 1',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'newyear1.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/newyear1.jpg'
        }, {
            'name': 'New Year - Theme 2',
            'movie': __BASE__ + 'swf/bin/general.swf?bg=' + __BASE__ + 'newyear2.jpg&',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/newyear2.jpg'
        }]
    }, {
        'category': 'Christmas Greetings',
        'movies': [{
            'name': 'Merry Christmas',
            'movie': __BASE__ + 'swf/bin/christmas1.swf',
            'width': '600',
            'height': '215',
            'preview': __BASE__ + 'swf/assets/christmas.jpg'
        }, {
            'name': 'Happy Carols',
            'movie': __BASE__ + 'swf/bin/christmas2.swf',
            'width': '488',
            'height': '318',
            'preview': __BASE__ + 'swf/assets/christmas2.jpg'
        }]
    }],
    
    currentTheme: 0,
    
    init: function(themeDiv, previewDiv){
        var docPos = "<ul>";
        for (var i = 0; i < this.theme.length; i++) {
            docPos += "<li><a href = 'javascript:ThemePicker.showCategory(" + i + ")'>" + this.theme[i].category + "</a>";
            docPos += "<div style = 'padding : 1px;display : none; width : 100%' id = 'themeCategory_" + i + "'>";
            docPos += "<ul style = 'list-style : none; padding : 1px;'>"
            for (var j = 0; j < this.theme[i].movies.length; j++) {
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
        this.selectTheme(0, 0);
        
    },
    
    showCategory: function(category){
        for (var i = 0; i < this.theme.length; i++) {
            document.getElementById("themeCategory_" + i).style.display = "none";
        }
        document.getElementById("themeCategory_" + category).style.display = "";
    },
    
    previewTheme: function(category, themeIndex){
        this.themePreview.innerHTML = "<img src = 'img/blank.jpg' width = '330' height = '200'>";
        this.themePreview.innerHTML = "<img src = '" + this.theme[category].movies[themeIndex].preview + "' width = '330' height = '200'>"
    },
    
    selectTheme: function(category, themeIndex){
        this.currentTheme = this.theme[category].movies[themeIndex];
        document.getElementById("theme_radio_" + category + "_" + themeIndex).checked = "checked";
        this.previewTheme(category, themeIndex);
    }
};
