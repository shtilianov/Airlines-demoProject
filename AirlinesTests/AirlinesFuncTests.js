spec(function(){
    // Specify your query objects here.
    var queries = {
        username:  {'tagName': 'input', 'index' : 0},
        password:  {'tagName': 'input', 'index' : 1}, 
        submitBtn: {'tagName': 'input', 'index' : 2},
        shit: {'id':'flightStatusView'},
    };

    // Specify variables used by various steps here.
    var username = "jaxon.daniels@gmail.com";
    var password = "password";

    // Define your steps here. Use 'ios', 'android' and  'wp8' fields to specify OS specific actions
    // and 'default' fileds to specify common action.
    var stepRepository = {
        "launch application": {
            'ios': [
                // ios app identifier
                ios.launch('airlines://')
            ],
            'android': [
                // android app identifier
                android.launch('com.telerik.airlinessampleapp')
            ],
            'wp8': [
                wp8.launch('yourApplicationUrl'),
            ]
        },
        
          "Enter Username": {
             'default': [
                 // Enter username
                 web.setText(queries.username, username)
                        
            ]
                },
        
        "Enter Password": {
            'default':[
                // Enter password
                web.setText(queries.password, password)
            ]
        },
                
        "Tap login": {
            'default': [
                // Tap Login button
                web.click(queries.submitBtn),
                web.wait(10000)
            ]
        },
        "shit":{
            'default':[
                web.click(queries.shit)
            ]
        }
    };

    // Describe your suite here. 
    // Note that the steps are defined using a step definitions
    // object instead of being defined inline.
    describe("Login and main view", function(){

        test("Login", function(){
            step("launch application");
            step("Enter Username");
            step("Enter Password");
            step("tap login");
            
        });
        // 
    }, stepRepository);
});
