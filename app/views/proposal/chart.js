import Ember from 'ember';

export default Ember.View.extend({

  template: Ember.Handlebars.compile('<div id="pieChart"></div>'),

  didInsertElement: function () {

    var pie = new d3pie("pieChart", {
      "header": {
        "title": {
          "fontSize": 24,
          "font": "open sans"
        },
        "subtitle": {
          "color": "#999999",
          "fontSize": 12,
          "font": "open sans"
        },
        "titleSubtitlePadding": 9
      },
      "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "canvasHeight": 283,
        "canvasWidth": 290
      },
      "data": {
        "sortOrder": "value-desc",
        "content": [
          {
            "label": "Visual Basic",
            "value": 78327,
            "color": "#cc9fb1"
          },
          {
            "label": "Scheme",
            "value": 67706,
            "color": "#e65414"
          },
          {
            "label": "Rust",
            "value": 36344,
            "color": "#8b6834"
          },
          {
            "label": "FoxPro",
            "value": 32170,
            "color": "#248838"
          }
        ]
      },
      "labels": {
        "outer": {
          "format": "none",
          "pieDistance": 32
        },
        "inner": {
          "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
          "fontSize": 11
        },
        "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
        },
        "value": {
          "color": "#adadad",
          "fontSize": 11
        },
        "lines": {
          "enabled": true
        }
      },
      "effects": {
        "pullOutSegmentOnClick": {
          "speed": 400,
          "size": 8
        }
      },
      "misc": {
        "gradient": {
          "enabled": true,
          "percentage": 100
        }
      }
    });

  }

});
