/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 200.0, "minX": 0.0, "maxY": 895.0, "series": [{"data": [[0.0, 200.0], [0.1, 201.0], [0.2, 203.0], [0.3, 203.0], [0.4, 203.0], [0.5, 203.0], [0.6, 204.0], [0.7, 204.0], [0.8, 205.0], [0.9, 205.0], [1.0, 206.0], [1.1, 206.0], [1.2, 206.0], [1.3, 206.0], [1.4, 206.0], [1.5, 206.0], [1.6, 206.0], [1.7, 206.0], [1.8, 207.0], [1.9, 207.0], [2.0, 207.0], [2.1, 207.0], [2.2, 207.0], [2.3, 207.0], [2.4, 207.0], [2.5, 207.0], [2.6, 207.0], [2.7, 207.0], [2.8, 207.0], [2.9, 207.0], [3.0, 208.0], [3.1, 208.0], [3.2, 208.0], [3.3, 208.0], [3.4, 208.0], [3.5, 208.0], [3.6, 209.0], [3.7, 209.0], [3.8, 209.0], [3.9, 209.0], [4.0, 209.0], [4.1, 210.0], [4.2, 210.0], [4.3, 210.0], [4.4, 210.0], [4.5, 210.0], [4.6, 210.0], [4.7, 210.0], [4.8, 210.0], [4.9, 210.0], [5.0, 210.0], [5.1, 210.0], [5.2, 210.0], [5.3, 210.0], [5.4, 211.0], [5.5, 211.0], [5.6, 211.0], [5.7, 211.0], [5.8, 211.0], [5.9, 211.0], [6.0, 211.0], [6.1, 211.0], [6.2, 211.0], [6.3, 211.0], [6.4, 211.0], [6.5, 211.0], [6.6, 211.0], [6.7, 211.0], [6.8, 212.0], [6.9, 212.0], [7.0, 212.0], [7.1, 212.0], [7.2, 212.0], [7.3, 212.0], [7.4, 212.0], [7.5, 212.0], [7.6, 213.0], [7.7, 213.0], [7.8, 213.0], [7.9, 213.0], [8.0, 213.0], [8.1, 213.0], [8.2, 213.0], [8.3, 213.0], [8.4, 213.0], [8.5, 214.0], [8.6, 214.0], [8.7, 214.0], [8.8, 214.0], [8.9, 214.0], [9.0, 214.0], [9.1, 215.0], [9.2, 215.0], [9.3, 215.0], [9.4, 215.0], [9.5, 215.0], [9.6, 215.0], [9.7, 215.0], [9.8, 215.0], [9.9, 215.0], [10.0, 215.0], [10.1, 215.0], [10.2, 216.0], [10.3, 216.0], [10.4, 216.0], [10.5, 216.0], [10.6, 216.0], [10.7, 216.0], [10.8, 216.0], [10.9, 217.0], [11.0, 217.0], [11.1, 217.0], [11.2, 217.0], [11.3, 217.0], [11.4, 217.0], [11.5, 217.0], [11.6, 217.0], [11.7, 217.0], [11.8, 218.0], [11.9, 218.0], [12.0, 218.0], [12.1, 218.0], [12.2, 218.0], [12.3, 218.0], [12.4, 218.0], [12.5, 218.0], [12.6, 218.0], [12.7, 218.0], [12.8, 218.0], [12.9, 219.0], [13.0, 219.0], [13.1, 219.0], [13.2, 219.0], [13.3, 219.0], [13.4, 219.0], [13.5, 219.0], [13.6, 219.0], [13.7, 219.0], [13.8, 219.0], [13.9, 219.0], [14.0, 219.0], [14.1, 219.0], [14.2, 220.0], [14.3, 220.0], [14.4, 220.0], [14.5, 220.0], [14.6, 221.0], [14.7, 221.0], [14.8, 221.0], [14.9, 221.0], [15.0, 221.0], [15.1, 221.0], [15.2, 222.0], [15.3, 222.0], [15.4, 222.0], [15.5, 222.0], [15.6, 222.0], [15.7, 222.0], [15.8, 223.0], [15.9, 223.0], [16.0, 223.0], [16.1, 223.0], [16.2, 223.0], [16.3, 223.0], [16.4, 223.0], [16.5, 223.0], [16.6, 223.0], [16.7, 223.0], [16.8, 223.0], [16.9, 224.0], [17.0, 224.0], [17.1, 224.0], [17.2, 224.0], [17.3, 224.0], [17.4, 224.0], [17.5, 224.0], [17.6, 224.0], [17.7, 224.0], [17.8, 224.0], [17.9, 224.0], [18.0, 224.0], [18.1, 225.0], [18.2, 225.0], [18.3, 225.0], [18.4, 225.0], [18.5, 225.0], [18.6, 225.0], [18.7, 225.0], [18.8, 225.0], [18.9, 226.0], [19.0, 226.0], [19.1, 226.0], [19.2, 226.0], [19.3, 226.0], [19.4, 227.0], [19.5, 227.0], [19.6, 227.0], [19.7, 227.0], [19.8, 227.0], [19.9, 227.0], [20.0, 227.0], [20.1, 227.0], [20.2, 228.0], [20.3, 228.0], [20.4, 228.0], [20.5, 228.0], [20.6, 228.0], [20.7, 228.0], [20.8, 229.0], [20.9, 229.0], [21.0, 229.0], [21.1, 229.0], [21.2, 230.0], [21.3, 230.0], [21.4, 230.0], [21.5, 230.0], [21.6, 230.0], [21.7, 230.0], [21.8, 230.0], [21.9, 231.0], [22.0, 231.0], [22.1, 231.0], [22.2, 231.0], [22.3, 231.0], [22.4, 231.0], [22.5, 231.0], [22.6, 231.0], [22.7, 231.0], [22.8, 231.0], [22.9, 231.0], [23.0, 231.0], [23.1, 232.0], [23.2, 232.0], [23.3, 232.0], [23.4, 233.0], [23.5, 233.0], [23.6, 233.0], [23.7, 233.0], [23.8, 233.0], [23.9, 233.0], [24.0, 234.0], [24.1, 234.0], [24.2, 234.0], [24.3, 235.0], [24.4, 235.0], [24.5, 235.0], [24.6, 235.0], [24.7, 235.0], [24.8, 236.0], [24.9, 236.0], [25.0, 236.0], [25.1, 236.0], [25.2, 236.0], [25.3, 237.0], [25.4, 237.0], [25.5, 237.0], [25.6, 237.0], [25.7, 237.0], [25.8, 237.0], [25.9, 237.0], [26.0, 237.0], [26.1, 238.0], [26.2, 238.0], [26.3, 238.0], [26.4, 238.0], [26.5, 238.0], [26.6, 238.0], [26.7, 238.0], [26.8, 238.0], [26.9, 238.0], [27.0, 238.0], [27.1, 238.0], [27.2, 239.0], [27.3, 239.0], [27.4, 239.0], [27.5, 239.0], [27.6, 239.0], [27.7, 239.0], [27.8, 240.0], [27.9, 240.0], [28.0, 240.0], [28.1, 240.0], [28.2, 240.0], [28.3, 241.0], [28.4, 241.0], [28.5, 241.0], [28.6, 241.0], [28.7, 241.0], [28.8, 241.0], [28.9, 241.0], [29.0, 242.0], [29.1, 242.0], [29.2, 242.0], [29.3, 242.0], [29.4, 242.0], [29.5, 243.0], [29.6, 243.0], [29.7, 244.0], [29.8, 244.0], [29.9, 244.0], [30.0, 244.0], [30.1, 244.0], [30.2, 244.0], [30.3, 244.0], [30.4, 244.0], [30.5, 245.0], [30.6, 246.0], [30.7, 246.0], [30.8, 246.0], [30.9, 246.0], [31.0, 246.0], [31.1, 246.0], [31.2, 246.0], [31.3, 246.0], [31.4, 247.0], [31.5, 247.0], [31.6, 247.0], [31.7, 247.0], [31.8, 247.0], [31.9, 247.0], [32.0, 247.0], [32.1, 247.0], [32.2, 248.0], [32.3, 248.0], [32.4, 248.0], [32.5, 248.0], [32.6, 248.0], [32.7, 249.0], [32.8, 249.0], [32.9, 249.0], [33.0, 249.0], [33.1, 249.0], [33.2, 249.0], [33.3, 249.0], [33.4, 249.0], [33.5, 249.0], [33.6, 249.0], [33.7, 249.0], [33.8, 249.0], [33.9, 249.0], [34.0, 250.0], [34.1, 250.0], [34.2, 250.0], [34.3, 250.0], [34.4, 250.0], [34.5, 251.0], [34.6, 251.0], [34.7, 252.0], [34.8, 252.0], [34.9, 252.0], [35.0, 252.0], [35.1, 252.0], [35.2, 252.0], [35.3, 252.0], [35.4, 252.0], [35.5, 253.0], [35.6, 253.0], [35.7, 253.0], [35.8, 253.0], [35.9, 253.0], [36.0, 253.0], [36.1, 253.0], [36.2, 254.0], [36.3, 254.0], [36.4, 254.0], [36.5, 254.0], [36.6, 254.0], [36.7, 255.0], [36.8, 255.0], [36.9, 255.0], [37.0, 255.0], [37.1, 255.0], [37.2, 255.0], [37.3, 255.0], [37.4, 256.0], [37.5, 256.0], [37.6, 256.0], [37.7, 256.0], [37.8, 256.0], [37.9, 256.0], [38.0, 256.0], [38.1, 256.0], [38.2, 256.0], [38.3, 256.0], [38.4, 256.0], [38.5, 256.0], [38.6, 256.0], [38.7, 257.0], [38.8, 257.0], [38.9, 257.0], [39.0, 257.0], [39.1, 257.0], [39.2, 257.0], [39.3, 257.0], [39.4, 258.0], [39.5, 258.0], [39.6, 258.0], [39.7, 258.0], [39.8, 258.0], [39.9, 258.0], [40.0, 259.0], [40.1, 259.0], [40.2, 259.0], [40.3, 259.0], [40.4, 259.0], [40.5, 259.0], [40.6, 259.0], [40.7, 259.0], [40.8, 259.0], [40.9, 260.0], [41.0, 260.0], [41.1, 260.0], [41.2, 260.0], [41.3, 261.0], [41.4, 261.0], [41.5, 261.0], [41.6, 261.0], [41.7, 261.0], [41.8, 261.0], [41.9, 261.0], [42.0, 261.0], [42.1, 262.0], [42.2, 262.0], [42.3, 262.0], [42.4, 263.0], [42.5, 263.0], [42.6, 263.0], [42.7, 264.0], [42.8, 264.0], [42.9, 264.0], [43.0, 264.0], [43.1, 264.0], [43.2, 264.0], [43.3, 264.0], [43.4, 265.0], [43.5, 265.0], [43.6, 265.0], [43.7, 265.0], [43.8, 265.0], [43.9, 265.0], [44.0, 265.0], [44.1, 266.0], [44.2, 266.0], [44.3, 266.0], [44.4, 266.0], [44.5, 266.0], [44.6, 266.0], [44.7, 266.0], [44.8, 266.0], [44.9, 267.0], [45.0, 267.0], [45.1, 267.0], [45.2, 267.0], [45.3, 268.0], [45.4, 268.0], [45.5, 268.0], [45.6, 268.0], [45.7, 268.0], [45.8, 268.0], [45.9, 269.0], [46.0, 269.0], [46.1, 269.0], [46.2, 269.0], [46.3, 269.0], [46.4, 269.0], [46.5, 270.0], [46.6, 270.0], [46.7, 270.0], [46.8, 270.0], [46.9, 270.0], [47.0, 270.0], [47.1, 270.0], [47.2, 271.0], [47.3, 271.0], [47.4, 271.0], [47.5, 271.0], [47.6, 271.0], [47.7, 271.0], [47.8, 271.0], [47.9, 271.0], [48.0, 272.0], [48.1, 272.0], [48.2, 272.0], [48.3, 273.0], [48.4, 273.0], [48.5, 274.0], [48.6, 274.0], [48.7, 274.0], [48.8, 274.0], [48.9, 274.0], [49.0, 274.0], [49.1, 274.0], [49.2, 275.0], [49.3, 275.0], [49.4, 275.0], [49.5, 275.0], [49.6, 276.0], [49.7, 276.0], [49.8, 276.0], [49.9, 276.0], [50.0, 276.0], [50.1, 277.0], [50.2, 277.0], [50.3, 277.0], [50.4, 277.0], [50.5, 277.0], [50.6, 277.0], [50.7, 278.0], [50.8, 278.0], [50.9, 278.0], [51.0, 278.0], [51.1, 278.0], [51.2, 278.0], [51.3, 279.0], [51.4, 279.0], [51.5, 279.0], [51.6, 280.0], [51.7, 281.0], [51.8, 281.0], [51.9, 281.0], [52.0, 281.0], [52.1, 281.0], [52.2, 282.0], [52.3, 282.0], [52.4, 282.0], [52.5, 282.0], [52.6, 282.0], [52.7, 283.0], [52.8, 283.0], [52.9, 283.0], [53.0, 283.0], [53.1, 283.0], [53.2, 283.0], [53.3, 283.0], [53.4, 283.0], [53.5, 284.0], [53.6, 284.0], [53.7, 284.0], [53.8, 284.0], [53.9, 284.0], [54.0, 284.0], [54.1, 285.0], [54.2, 286.0], [54.3, 286.0], [54.4, 286.0], [54.5, 286.0], [54.6, 286.0], [54.7, 286.0], [54.8, 287.0], [54.9, 287.0], [55.0, 287.0], [55.1, 287.0], [55.2, 287.0], [55.3, 287.0], [55.4, 287.0], [55.5, 287.0], [55.6, 287.0], [55.7, 287.0], [55.8, 288.0], [55.9, 288.0], [56.0, 288.0], [56.1, 288.0], [56.2, 288.0], [56.3, 289.0], [56.4, 289.0], [56.5, 289.0], [56.6, 289.0], [56.7, 289.0], [56.8, 289.0], [56.9, 290.0], [57.0, 290.0], [57.1, 290.0], [57.2, 290.0], [57.3, 291.0], [57.4, 291.0], [57.5, 291.0], [57.6, 291.0], [57.7, 291.0], [57.8, 292.0], [57.9, 292.0], [58.0, 292.0], [58.1, 292.0], [58.2, 293.0], [58.3, 293.0], [58.4, 293.0], [58.5, 293.0], [58.6, 294.0], [58.7, 294.0], [58.8, 294.0], [58.9, 294.0], [59.0, 294.0], [59.1, 294.0], [59.2, 295.0], [59.3, 295.0], [59.4, 295.0], [59.5, 296.0], [59.6, 296.0], [59.7, 296.0], [59.8, 296.0], [59.9, 296.0], [60.0, 297.0], [60.1, 297.0], [60.2, 297.0], [60.3, 297.0], [60.4, 297.0], [60.5, 298.0], [60.6, 298.0], [60.7, 298.0], [60.8, 298.0], [60.9, 298.0], [61.0, 298.0], [61.1, 298.0], [61.2, 299.0], [61.3, 299.0], [61.4, 299.0], [61.5, 299.0], [61.6, 299.0], [61.7, 299.0], [61.8, 300.0], [61.9, 300.0], [62.0, 300.0], [62.1, 300.0], [62.2, 300.0], [62.3, 300.0], [62.4, 300.0], [62.5, 301.0], [62.6, 301.0], [62.7, 301.0], [62.8, 301.0], [62.9, 302.0], [63.0, 302.0], [63.1, 302.0], [63.2, 302.0], [63.3, 303.0], [63.4, 303.0], [63.5, 303.0], [63.6, 303.0], [63.7, 303.0], [63.8, 303.0], [63.9, 304.0], [64.0, 304.0], [64.1, 304.0], [64.2, 305.0], [64.3, 305.0], [64.4, 305.0], [64.5, 305.0], [64.6, 305.0], [64.7, 306.0], [64.8, 306.0], [64.9, 306.0], [65.0, 307.0], [65.1, 307.0], [65.2, 307.0], [65.3, 307.0], [65.4, 307.0], [65.5, 307.0], [65.6, 307.0], [65.7, 307.0], [65.8, 307.0], [65.9, 307.0], [66.0, 308.0], [66.1, 308.0], [66.2, 308.0], [66.3, 309.0], [66.4, 309.0], [66.5, 309.0], [66.6, 309.0], [66.7, 309.0], [66.8, 309.0], [66.9, 309.0], [67.0, 309.0], [67.1, 310.0], [67.2, 310.0], [67.3, 311.0], [67.4, 311.0], [67.5, 311.0], [67.6, 311.0], [67.7, 312.0], [67.8, 312.0], [67.9, 312.0], [68.0, 312.0], [68.1, 312.0], [68.2, 312.0], [68.3, 312.0], [68.4, 312.0], [68.5, 312.0], [68.6, 313.0], [68.7, 313.0], [68.8, 314.0], [68.9, 314.0], [69.0, 314.0], [69.1, 314.0], [69.2, 315.0], [69.3, 315.0], [69.4, 315.0], [69.5, 315.0], [69.6, 315.0], [69.7, 316.0], [69.8, 316.0], [69.9, 317.0], [70.0, 317.0], [70.1, 317.0], [70.2, 319.0], [70.3, 319.0], [70.4, 319.0], [70.5, 320.0], [70.6, 320.0], [70.7, 320.0], [70.8, 322.0], [70.9, 322.0], [71.0, 323.0], [71.1, 323.0], [71.2, 323.0], [71.3, 324.0], [71.4, 325.0], [71.5, 325.0], [71.6, 325.0], [71.7, 325.0], [71.8, 326.0], [71.9, 326.0], [72.0, 326.0], [72.1, 326.0], [72.2, 327.0], [72.3, 329.0], [72.4, 329.0], [72.5, 330.0], [72.6, 330.0], [72.7, 331.0], [72.8, 331.0], [72.9, 331.0], [73.0, 332.0], [73.1, 332.0], [73.2, 332.0], [73.3, 333.0], [73.4, 334.0], [73.5, 334.0], [73.6, 335.0], [73.7, 335.0], [73.8, 336.0], [73.9, 336.0], [74.0, 336.0], [74.1, 337.0], [74.2, 337.0], [74.3, 337.0], [74.4, 338.0], [74.5, 338.0], [74.6, 338.0], [74.7, 338.0], [74.8, 338.0], [74.9, 339.0], [75.0, 339.0], [75.1, 339.0], [75.2, 340.0], [75.3, 340.0], [75.4, 341.0], [75.5, 342.0], [75.6, 342.0], [75.7, 343.0], [75.8, 344.0], [75.9, 344.0], [76.0, 344.0], [76.1, 345.0], [76.2, 345.0], [76.3, 345.0], [76.4, 345.0], [76.5, 347.0], [76.6, 348.0], [76.7, 349.0], [76.8, 349.0], [76.9, 349.0], [77.0, 350.0], [77.1, 350.0], [77.2, 350.0], [77.3, 350.0], [77.4, 350.0], [77.5, 351.0], [77.6, 351.0], [77.7, 351.0], [77.8, 352.0], [77.9, 353.0], [78.0, 355.0], [78.1, 355.0], [78.2, 355.0], [78.3, 356.0], [78.4, 357.0], [78.5, 357.0], [78.6, 358.0], [78.7, 358.0], [78.8, 358.0], [78.9, 358.0], [79.0, 358.0], [79.1, 359.0], [79.2, 359.0], [79.3, 359.0], [79.4, 360.0], [79.5, 360.0], [79.6, 361.0], [79.7, 361.0], [79.8, 363.0], [79.9, 363.0], [80.0, 363.0], [80.1, 363.0], [80.2, 363.0], [80.3, 363.0], [80.4, 364.0], [80.5, 364.0], [80.6, 365.0], [80.7, 365.0], [80.8, 366.0], [80.9, 368.0], [81.0, 368.0], [81.1, 369.0], [81.2, 369.0], [81.3, 370.0], [81.4, 370.0], [81.5, 370.0], [81.6, 371.0], [81.7, 372.0], [81.8, 372.0], [81.9, 373.0], [82.0, 374.0], [82.1, 374.0], [82.2, 374.0], [82.3, 374.0], [82.4, 375.0], [82.5, 376.0], [82.6, 377.0], [82.7, 377.0], [82.8, 378.0], [82.9, 379.0], [83.0, 379.0], [83.1, 380.0], [83.2, 381.0], [83.3, 382.0], [83.4, 382.0], [83.5, 382.0], [83.6, 382.0], [83.7, 383.0], [83.8, 383.0], [83.9, 384.0], [84.0, 384.0], [84.1, 384.0], [84.2, 384.0], [84.3, 385.0], [84.4, 385.0], [84.5, 385.0], [84.6, 385.0], [84.7, 386.0], [84.8, 387.0], [84.9, 388.0], [85.0, 390.0], [85.1, 390.0], [85.2, 390.0], [85.3, 390.0], [85.4, 390.0], [85.5, 391.0], [85.6, 392.0], [85.7, 393.0], [85.8, 394.0], [85.9, 394.0], [86.0, 394.0], [86.1, 395.0], [86.2, 395.0], [86.3, 396.0], [86.4, 396.0], [86.5, 396.0], [86.6, 397.0], [86.7, 397.0], [86.8, 397.0], [86.9, 397.0], [87.0, 398.0], [87.1, 399.0], [87.2, 400.0], [87.3, 400.0], [87.4, 400.0], [87.5, 400.0], [87.6, 402.0], [87.7, 402.0], [87.8, 405.0], [87.9, 412.0], [88.0, 414.0], [88.1, 421.0], [88.2, 423.0], [88.3, 424.0], [88.4, 424.0], [88.5, 424.0], [88.6, 425.0], [88.7, 425.0], [88.8, 426.0], [88.9, 427.0], [89.0, 427.0], [89.1, 427.0], [89.2, 427.0], [89.3, 428.0], [89.4, 429.0], [89.5, 431.0], [89.6, 432.0], [89.7, 432.0], [89.8, 432.0], [89.9, 435.0], [90.0, 435.0], [90.1, 436.0], [90.2, 437.0], [90.3, 438.0], [90.4, 441.0], [90.5, 441.0], [90.6, 441.0], [90.7, 441.0], [90.8, 441.0], [90.9, 442.0], [91.0, 445.0], [91.1, 445.0], [91.2, 446.0], [91.3, 446.0], [91.4, 446.0], [91.5, 447.0], [91.6, 448.0], [91.7, 449.0], [91.8, 449.0], [91.9, 450.0], [92.0, 450.0], [92.1, 451.0], [92.2, 451.0], [92.3, 452.0], [92.4, 453.0], [92.5, 453.0], [92.6, 454.0], [92.7, 457.0], [92.8, 457.0], [92.9, 458.0], [93.0, 458.0], [93.1, 458.0], [93.2, 458.0], [93.3, 459.0], [93.4, 459.0], [93.5, 459.0], [93.6, 460.0], [93.7, 462.0], [93.8, 463.0], [93.9, 463.0], [94.0, 465.0], [94.1, 465.0], [94.2, 465.0], [94.3, 466.0], [94.4, 466.0], [94.5, 466.0], [94.6, 466.0], [94.7, 466.0], [94.8, 466.0], [94.9, 467.0], [95.0, 469.0], [95.1, 471.0], [95.2, 475.0], [95.3, 475.0], [95.4, 476.0], [95.5, 478.0], [95.6, 479.0], [95.7, 479.0], [95.8, 479.0], [95.9, 480.0], [96.0, 482.0], [96.1, 483.0], [96.2, 483.0], [96.3, 484.0], [96.4, 484.0], [96.5, 485.0], [96.6, 485.0], [96.7, 485.0], [96.8, 486.0], [96.9, 494.0], [97.0, 513.0], [97.1, 521.0], [97.2, 523.0], [97.3, 524.0], [97.4, 530.0], [97.5, 534.0], [97.6, 589.0], [97.7, 605.0], [97.8, 607.0], [97.9, 607.0], [98.0, 609.0], [98.1, 611.0], [98.2, 655.0], [98.3, 660.0], [98.4, 668.0], [98.5, 677.0], [98.6, 679.0], [98.7, 681.0], [98.8, 689.0], [98.9, 689.0], [99.0, 691.0], [99.1, 691.0], [99.2, 693.0], [99.3, 694.0], [99.4, 717.0], [99.5, 718.0], [99.6, 722.0], [99.7, 739.0], [99.8, 743.0], [99.9, 870.0]], "isOverall": false, "label": "Crear pedido", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 200.0, "maxY": 679.0, "series": [{"data": [[300.0, 279.0], [600.0, 19.0], [700.0, 5.0], [200.0, 679.0], [400.0, 107.0], [800.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "Crear pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 34.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1065.0, "series": [{"data": [[0.0, 1065.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 34.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 6.909090909090908, "minX": 1.7413245E12, "maxY": 100.0, "series": [{"data": [[1.74132456E12, 59.73796791443848], [1.74132504E12, 99.34], [1.74132474E12, 100.0], [1.74132492E12, 100.0], [1.7413251E12, 45.7777777777778], [1.74132462E12, 100.0], [1.7413248E12, 100.0], [1.7413245E12, 6.909090909090908], [1.74132498E12, 100.0], [1.74132468E12, 100.0], [1.74132486E12, 100.0]], "isOverall": false, "label": "100 Crear pedidos normal", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7413251E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 206.0, "minX": 1.0, "maxY": 549.7777777777778, "series": [{"data": [[2.0, 270.6666666666667], [3.0, 206.0], [4.0, 324.0], [5.0, 273.0], [6.0, 249.0], [7.0, 255.5], [8.0, 321.4], [9.0, 237.5], [10.0, 215.0], [11.0, 207.0], [12.0, 436.3333333333333], [13.0, 364.5], [14.0, 380.5], [15.0, 368.5], [16.0, 365.8333333333333], [17.0, 219.5], [18.0, 227.66666666666666], [19.0, 272.0], [20.0, 279.75], [21.0, 223.5], [22.0, 231.66666666666666], [23.0, 327.0], [24.0, 274.6], [25.0, 338.0], [26.0, 272.0], [27.0, 256.0], [28.0, 235.0], [29.0, 213.0], [30.0, 312.8333333333333], [31.0, 215.5], [32.0, 408.1666666666667], [33.0, 282.3333333333333], [34.0, 255.33333333333334], [35.0, 260.0], [36.0, 267.5], [37.0, 221.0], [38.0, 232.66666666666666], [39.0, 213.0], [40.0, 307.8333333333333], [41.0, 291.0], [42.0, 254.66666666666666], [43.0, 298.5], [44.0, 265.25], [45.0, 242.5], [46.0, 226.66666666666666], [47.0, 268.5], [48.0, 291.1666666666667], [49.0, 216.5], [50.0, 282.3333333333333], [51.0, 240.0], [52.0, 294.6666666666667], [53.0, 236.33333333333334], [54.0, 247.66666666666666], [55.0, 234.0], [56.0, 351.0], [57.0, 268.5], [58.0, 281.0], [59.0, 215.0], [60.0, 239.0], [61.0, 350.4], [62.0, 242.66666666666666], [63.0, 224.5], [65.0, 549.7777777777778], [66.0, 252.0], [67.0, 232.5], [64.0, 220.0], [68.0, 278.0], [69.0, 237.5], [70.0, 239.66666666666666], [71.0, 279.0], [72.0, 321.4], [73.0, 223.0], [74.0, 225.0], [75.0, 294.0], [76.0, 262.3333333333333], [77.0, 217.0], [78.0, 449.75000000000006], [79.0, 217.0], [80.0, 361.6], [81.0, 253.0], [82.0, 261.0], [83.0, 318.5], [84.0, 272.75], [85.0, 307.0], [86.0, 218.0], [87.0, 218.5], [88.0, 307.8], [89.0, 265.0], [90.0, 243.66666666666666], [91.0, 247.0], [92.0, 336.0], [93.0, 280.0], [94.0, 234.33333333333334], [95.0, 232.0], [96.0, 358.42857142857144], [97.0, 235.5], [98.0, 229.0], [99.0, 246.5], [100.0, 305.8370646766168], [1.0, 228.5]], "isOverall": false, "label": "Crear pedido", "isController": false}, {"data": [[86.78525932666038, 303.00818926296677]], "isOverall": false, "label": "Crear pedido-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 204.96666666666667, "minX": 1.7413245E12, "maxY": 2203.483333333333, "series": [{"data": [[1.74132456E12, 2203.483333333333], [1.74132504E12, 1178.3333333333333], [1.74132474E12, 1178.3333333333333], [1.74132492E12, 1178.3333333333333], [1.7413251E12, 1060.5], [1.74132462E12, 1178.3333333333333], [1.7413248E12, 1178.3333333333333], [1.7413245E12, 259.23333333333335], [1.74132498E12, 1178.3333333333333], [1.74132468E12, 1178.3333333333333], [1.74132486E12, 1178.3333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74132456E12, 1742.2166666666667], [1.74132504E12, 931.6666666666666], [1.74132474E12, 931.6666666666666], [1.74132492E12, 931.6666666666666], [1.7413251E12, 838.5], [1.74132462E12, 931.6666666666666], [1.7413248E12, 931.6666666666666], [1.7413245E12, 204.96666666666667], [1.74132498E12, 931.6666666666666], [1.74132468E12, 931.6666666666666], [1.74132486E12, 931.6666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7413251E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 287.37, "minX": 1.7413245E12, "maxY": 386.25, "series": [{"data": [[1.74132456E12, 292.03208556149735], [1.74132504E12, 301.75999999999993], [1.74132474E12, 287.66999999999996], [1.74132492E12, 303.38999999999993], [1.7413251E12, 300.98888888888894], [1.74132462E12, 296.7200000000001], [1.7413248E12, 287.37], [1.7413245E12, 294.5909090909091], [1.74132498E12, 294.0999999999999], [1.74132468E12, 386.25], [1.74132486E12, 290.99999999999983]], "isOverall": false, "label": "Crear pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7413251E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 287.31000000000006, "minX": 1.7413245E12, "maxY": 386.19, "series": [{"data": [[1.74132456E12, 291.89839572192517], [1.74132504E12, 301.70000000000016], [1.74132474E12, 287.65000000000003], [1.74132492E12, 303.34999999999997], [1.7413251E12, 300.9555555555556], [1.74132462E12, 296.69], [1.7413248E12, 287.31000000000006], [1.7413245E12, 294.49999999999994], [1.74132498E12, 294.0899999999999], [1.74132468E12, 386.19], [1.74132486E12, 290.9799999999998]], "isOverall": false, "label": "Crear pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7413251E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 14.179999999999998, "minX": 1.7413245E12, "maxY": 59.63999999999997, "series": [{"data": [[1.74132456E12, 18.171122994652396], [1.74132504E12, 19.119999999999997], [1.74132474E12, 14.93], [1.74132492E12, 22.45], [1.7413251E12, 16.688888888888883], [1.74132462E12, 16.060000000000002], [1.7413248E12, 16.47], [1.7413245E12, 14.272727272727273], [1.74132498E12, 14.179999999999998], [1.74132468E12, 59.63999999999997], [1.74132486E12, 16.87]], "isOverall": false, "label": "Crear pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7413251E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 200.0, "minX": 1.7413245E12, "maxY": 895.0, "series": [{"data": [[1.74132456E12, 655.0], [1.74132504E12, 485.0], [1.74132474E12, 432.0], [1.74132492E12, 494.0], [1.7413251E12, 483.0], [1.74132462E12, 485.0], [1.7413248E12, 534.0], [1.7413245E12, 438.0], [1.74132498E12, 486.0], [1.74132468E12, 895.0], [1.74132486E12, 513.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74132456E12, 203.0], [1.74132504E12, 208.0], [1.74132474E12, 205.0], [1.74132492E12, 203.0], [1.7413251E12, 200.0], [1.74132462E12, 204.0], [1.7413248E12, 207.0], [1.7413245E12, 206.0], [1.74132498E12, 203.0], [1.74132468E12, 208.0], [1.74132486E12, 201.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74132456E12, 397.20000000000005], [1.74132504E12, 457.0], [1.74132474E12, 384.0], [1.74132492E12, 428.8], [1.7413251E12, 462.9], [1.74132462E12, 451.0], [1.7413248E12, 435.9000000000003], [1.7413245E12, 435.7], [1.74132498E12, 431.9], [1.74132468E12, 691.0], [1.74132486E12, 389.8]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74132456E12, 616.2800000000002], [1.74132504E12, 484.98], [1.74132474E12, 431.96], [1.74132492E12, 493.7399999999999], [1.7413251E12, 483.0], [1.74132462E12, 485.0], [1.7413248E12, 533.1499999999995], [1.7413245E12, 438.0], [1.74132498E12, 485.7999999999999], [1.74132468E12, 894.7499999999999], [1.74132486E12, 512.8799999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74132456E12, 263.0], [1.74132504E12, 282.5], [1.74132474E12, 275.0], [1.74132492E12, 269.0], [1.7413251E12, 265.0], [1.74132462E12, 270.5], [1.7413248E12, 269.0], [1.7413245E12, 295.5], [1.74132498E12, 277.5], [1.74132468E12, 300.5], [1.74132486E12, 282.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.74132456E12, 456.19999999999993], [1.74132504E12, 465.95], [1.74132474E12, 396.95], [1.74132492E12, 458.0], [1.7413251E12, 477.35], [1.74132462E12, 482.0], [1.7413248E12, 446.0], [1.7413245E12, 437.7], [1.74132498E12, 466.0], [1.74132468E12, 721.8], [1.74132486E12, 410.69999999999993]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7413251E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 223.0, "minX": 1.0, "maxY": 607.0, "series": [{"data": [[1.0, 223.0], [2.0, 259.0], [4.0, 299.5], [8.0, 482.5], [5.0, 331.0], [10.0, 607.0], [3.0, 264.5], [6.0, 396.0], [7.0, 355.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 223.0, "minX": 1.0, "maxY": 606.5, "series": [{"data": [[1.0, 223.0], [2.0, 259.0], [4.0, 299.5], [8.0, 482.5], [5.0, 331.0], [10.0, 606.5], [3.0, 264.5], [6.0, 395.5], [7.0, 355.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.38333333333333336, "minX": 1.7413245E12, "maxY": 3.1, "series": [{"data": [[1.74132456E12, 3.1], [1.74132504E12, 1.6666666666666667], [1.74132474E12, 1.6666666666666667], [1.74132492E12, 1.6666666666666667], [1.7413251E12, 1.5], [1.74132462E12, 1.6666666666666667], [1.7413248E12, 1.6666666666666667], [1.7413245E12, 0.38333333333333336], [1.74132498E12, 1.6666666666666667], [1.74132468E12, 1.6666666666666667], [1.74132486E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7413251E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.7413245E12, "maxY": 3.1166666666666667, "series": [{"data": [[1.74132456E12, 3.1166666666666667], [1.74132504E12, 1.6666666666666667], [1.74132474E12, 1.6666666666666667], [1.74132492E12, 1.6666666666666667], [1.7413251E12, 1.5], [1.74132462E12, 1.6666666666666667], [1.7413248E12, 1.6666666666666667], [1.7413245E12, 0.36666666666666664], [1.74132498E12, 1.6666666666666667], [1.74132468E12, 1.6666666666666667], [1.74132486E12, 1.6666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7413251E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.7413245E12, "maxY": 3.1166666666666667, "series": [{"data": [[1.74132456E12, 3.1166666666666667], [1.74132504E12, 1.6666666666666667], [1.74132474E12, 1.6666666666666667], [1.74132492E12, 1.6666666666666667], [1.7413251E12, 1.5], [1.74132462E12, 1.6666666666666667], [1.7413248E12, 1.6666666666666667], [1.7413245E12, 0.36666666666666664], [1.74132498E12, 1.6666666666666667], [1.74132468E12, 1.6666666666666667], [1.74132486E12, 1.6666666666666667]], "isOverall": false, "label": "Crear pedido-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7413251E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.7413245E12, "maxY": 3.1166666666666667, "series": [{"data": [[1.74132456E12, 3.1166666666666667], [1.74132504E12, 1.6666666666666667], [1.74132474E12, 1.6666666666666667], [1.74132492E12, 1.6666666666666667], [1.7413251E12, 1.5], [1.74132462E12, 1.6666666666666667], [1.7413248E12, 1.6666666666666667], [1.7413245E12, 0.36666666666666664], [1.74132498E12, 1.6666666666666667], [1.74132468E12, 1.6666666666666667], [1.74132486E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7413251E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

