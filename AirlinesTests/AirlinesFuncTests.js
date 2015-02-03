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
        mytripsButton:{'tagName':'a', 'index':0},
        backbutton:{'className':'ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-up-a'},
        flightstatus:{'id':'flightStatusView'},
        bagtrack:{'id':'bagTrackView'},
        flightprogress:{'id':'programProgressView'},
        settings:{'id':'settingsView'},
        bostontrip:{'xpath':'//*[@id="1111"]'},
        checkin:{'tagName':'a', 'index':10},
        passenger:{'id':'boardingpass-passenger'},
		flight:{'id':'boardingpass-flight'},
		departure:{'id':'boardingpass-depart'},
		gate:{'id':'boardingpass-gate'},
		seat:{'id':'boardingpass-seat'},
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
				// Take one additional screenshot for debugging purposes
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
		// This will open my trips section and will return error if it's not existing/visible
        "Open My Trips":{
            'default':[
                web.click(queries.mytripsButton)
            ]
        },
		// Verify the UI of the main page
        "Verify list items":{
            'default':[
                web.getValue(queries.mytripsButton, function(response){
                    assert(response).equals("MyTrips");
                }),
                web.getValue(queries.flightstatus, function(response){
                    assert(response).equals("Flight Status");
                }),
                 web.getValue(queries.bagtrack, function(response){
                    assert(response).equals("Track your bag");
                }),
                web.getValue(queries.flightprogress, function(response){
                    assert(response).equals("Mileage program progress");
                }),
                web.getValue(queries.settings, function(response){
                    assert(response).equals("Settings"); 
                })
            ]
        },
        "Open SEA to BOS trip":{
            'default':[
                web.click(queries.bostontrip),
				web.wait(5000)
            ]
        },
        "Check In":{
            'default':[
                web.click(queries.checkin),
				web.wait(5000)
            ]
        },
        // Return to the main menu
        "Go back to home screen": {
            'default': [
                web.click(queries.backbutton),
				web.wait(5000)
                
            ]
        },
		// Verify the boarding pass after 'check in'
		"Verify boarding pass": {
			'default': [
					web.getTextContent(queries.passenger, function(response){
                    assert(response).equals("Jaxon Daniels"); }),
					web.getTextContent(queries.flight, function(response){
                    assert(response).equals("111:SEA to BOS"); }),
					web.getTextContent(queries.departure, function(response){
                    assert(response).equals("5:00PM"); }),
					web.getTextContent(queries.gate, function(response){
                    assert(response).equals("C10"); }),
					web.getTextContent(queries.seat, function(response){
                    assert(response).equals("5A"); })
					
				]}
				
		
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
            
            
            });
        test("Open my trips and verify contents", function() {
            step("launch application");
            step("Tap login");
            step("Open My Trips");
            step("Open SEA to BOS trip");
            step("Check In");
			step("Verify boarding pass");
            step("Go back to home screen");
        });
        // Point to the step repository object
    }, stepRepository);
});
