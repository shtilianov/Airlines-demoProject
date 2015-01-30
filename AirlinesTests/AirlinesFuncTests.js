spec(function(){
    // Specify your query objects here.
    var queries = {
        username:  {'tagName': 'input', 'index' : 0},
        password:  {'tagName': 'input', 'index' : 1}, 
        submitBtn: {'tagName': 'input', 'index' : 2},
        title: {'tagName': 'h1'},
        airmiles: {'id':'ffnum'},
        totalmiles: {'id':'miles'},
        priority:{'id':'currentStatus'},
        mytripsButton:{'id':'myTripsView'},
        backbutton:{'id':'backButton'},
    };

    // Specify variables used by various steps here.
    var username = "jaxon.daniels@gmail.com";
    var password = "P2ssw0rd";
    var title = "Hi Jaxon!";
    var airmiles = "12345678";
    var totalmiles = "55555";
    var priority = "Diamond";

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
                 web.setTextContent(queries.username, username)
                        
            ]
                },
        
        "Enter Password": {
            'default':[
                // Enter password
                web.setTextContent(queries.password, password)
            ]
        },
                
        "Tap login": {
            'default': [
                // Tap Login button
                web.click(queries.submitBtn),
                web.wait(10000),
                
            ]
        },
                "Take screenshot after you login":{
                'default':[
                    web.screenshot()
            ]
                },
        "Verify title":{
            'default':[
                // Verify that the Main page title is correct
                web.getTextContent(queries.title, function(response){
                    assert(response).equals(title);
                })
            ]
        },
        "Verify flight summary":{
            'default':[
                // Assert that the values in the account flight summary are correct
                web.getTextContent(queries.airmiles, function(response){
                    assert(response).equals(airmiles);
                }),
                web.getTextContent(queries.totalmiles, function(response){
                    assert(response).equals(totalmiles);
                }),
                web.getTextContent(queries.priority, function(response){
                    assert(response).equals(priority);
                })
            ]
        },
        "Verify the list of options":{
            'default':[
                web.click(queries.mytripsButton)
            ]
        },
        "Go back":{
            'default':[
                web.click(queries.backbutton)
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
            step("Tap login");
            step("Take screenshot after you login");
        });
        test("Verify main view UI", function(){
            step("launch application");
            step("Tap login");
            step("Verify title");
            step("Verify flight summary");
            step("Verify the list of options");
            step("Go back");
            });
        // Point to the step repository object
    }, stepRepository);
});
