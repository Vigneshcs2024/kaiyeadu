// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:mobile/pages/profile_page.dart';
import 'package:mobile/services/api_manager.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/btn_widget_small.dart';
import 'package:mobile/widgets/button_widget.dart';
import 'package:mobile/widgets/container_widget.dart';
import 'package:mobile/widgets/home_buttons.dart';

class HomePage extends StatefulWidget {
  static const String id = 'HomeScreen';
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  late Future data;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    data = getPlanData();

  }

  Future getPlanData() {
    String url = "https://my.api.mockaroo.com/sample.json?key=7b80fb60";
    ApiManager apiManager = ApiManager(url);
    var data =  apiManager.getData();
    // data.then((value){
    //   print('title: ${value["articles"][0]["title"]}');
    // });
    return data;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Kaiyeadu",
        ),
        //elevation: 0,
        backgroundColor: beginColor,
        actions: <Widget>[
          InkWell(
            splashColor: Colors.white,
            child: IconButton(
                icon: Icon(Icons.logout_outlined),
                onPressed: () {
                  //Implement logout functionality
                  Navigator.pushNamedAndRemoveUntil(context, LoginPage.id,(route)=>false);
                }),
          )
        ],
      ),
      body: Container(
        decoration: backgroundImage25,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            ContainerWidget(),
            Expanded(
              child: FutureBuilder(
                  future: getPlanData(),
                  builder: (context, AsyncSnapshot snapshot) {
                    if(snapshot.hasData){
                      return  buildListView(snapshot.data, context);
                    }else{
                      return Center(child: CircularProgressIndicator());
                    }
                  },
                  // child: buildListView()
              ),
            ),
          ],
        ),
      )
    );
  }

  ListView buildListView(data, BuildContext context) {
    return ListView.builder(
                shrinkWrap: true,
                itemCount: data.length,
                itemBuilder: (BuildContext context,int index){
                  var dataValue = data[index];
                  return InkWell(
                    splashColor: beginColor,
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ProfilePage(data: dataValue,),
                          ));
                      //Navigator.pushNamed(context, ProfilePage.id);
                    },
                    child: ListTile(
                      horizontalTitleGap: 1.0,
                  //    minLeadingWidth: 2.0,
                        leading: CircleAvatar(
                          radius: 40,
                          backgroundColor: Colors.white,
                          child: Image.network(dataValue["image"]),
                        ),
                        trailing:  ButtonWidgetSmall(textName: "Cases",onPressed: ()
                        {
                          //Navigator.pushNamed(context, OtpPage.id);
                        },
                        ),
                      title: Text(dataValue["name"]),
                      subtitle: Text(dataValue["hs_number"]),
                      //   title:Text("Lelouch Lamperouge"),
                      // subtitle:Text("Mandaiyur Ps - HS No. 1234/80") ,
                    ),
                  );
                }
            );
  }
}


