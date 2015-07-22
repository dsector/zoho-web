import Ember from 'ember';

export default Ember.Component.extend({


  didInsertElement: function () {

    var pie = new d3pie("pieChart", {
      "header": {
        "title": {
          "fontSize": 24,
          "font": "open sans"
        },
        "subtitle": {
          "color": "#ffffff",
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
        "canvasHeight": 250,
        "canvasWidth": 250
      },
      "data": {
        "sortOrder": "value-desc",
        "content": [
          {
            "label": "Visual Basic",
            "value": 78327,
            "color": "#e4e4e4"
          },
          {
            "label": "Scheme",
            "value": 67706,
            "color": "#2F577F"
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
          "pieDistance": 10,
          hideWhenLessThanPercentage: true
        },
        "inner": {
          //"format": "label-percentage2",
          "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
          "fontSize": 11,
          color: "#ffffff"
        },
        "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
        },
        "value": {
          "color": "#ffffff",
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
        },
        pieCenterOffset: {
          x: -40,
          y: -40
        }
      }
    });

  }

});
