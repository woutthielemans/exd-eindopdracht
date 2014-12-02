#include "ofApp.h"

bool mouse_on_road = true;
float edge;
int robot_pos = 200;
float edge_robot_pos;
float road_width = 170;

float robot_xPos;
float robot_yPos;

void ofApp::setup(){
    
    ard.connect("/dev/cu.usbmodem1411", 57600);
    
    buttonState = "digital pin:";
    
    ofAddListener(ard.EInitialized, this, &ofApp::setupArduino);
    bSetupArduino	= false;
    
    verticalOscilators.push_back(oscillator());
    verticalOscilators.back().setup(50, 500);
    
    robot_xPos = ofGetWidth()/2-25;
    robot_yPos = ofGetHeight()-robot_pos-25+15;

    ofSetCircleResolution(40);
    
    for (int i=1; i<TAIL_LENGTH; i++) {
        waveHistory[i] = ofVec3f(0, 0, 0);
    }
    for (int i=1; i<WAVEFORM_HISTORY; i++) {
        vertWaveHistory[i] = 0;
    }
    
    center= ofPoint((ofGetWidth()-LEFT_MARGIN)*0.5f +LEFT_MARGIN,
                    (ofGetHeight()-TOP_MARGIN)*0.5f + TOP_MARGIN);
    
    scale=1;
    
    vWaveMult=(ofGetHeight()-TOP_MARGIN)/float(WAVEFORM_HISTORY);
    
    ofEnableSmoothing();
    ofEnableAlphaBlending();
    ofSetVerticalSync(true);
    
}

void ofApp::update(){
    
    updateArduino();
    
    for (unsigned int i=0; i<verticalOscilators.size(); i++) {
        verticalOscilators[i].update();
    }
    
    if(robot_xPos < (edge_robot_pos+(ofGetWidth()/2)-road_width/2) || robot_xPos+50 > (edge_robot_pos+(ofGetWidth()/2)+road_width/2)){
        mouse_on_road = false;
    }else{
        mouse_on_road = true;
    }

}

void ofApp::setupArduino(const int & version) {
    
    ofRemoveListener(ard.EInitialized, this, &ofApp::setupArduino);
    
    bSetupArduino = true;
    
    ofLogNotice() << ard.getFirmwareName();
    ofLogNotice() << "firmata v" << ard.getMajorFirmwareVersion() << "." << ard.getMinorFirmwareVersion();
    
    ard.sendDigitalPinMode(12, ARD_INPUT);
    ard.sendDigitalPinMode(13, ARD_INPUT);
    
    ofAddListener(ard.EDigitalPinChanged, this, &ofApp::digitalPinChanged);
}

void ofApp::updateArduino(){
    
    ard.update();
    
    if (bSetupArduino) {
        // arduino has been setup
    }
    
}

void ofApp::digitalPinChanged(const int & pinNum) {
    printf("connection: %i", pinNum);
    buttonState = "digital pin: " + ofToString(pinNum) + " = " + ofToString(ard.getDigital(pinNum));
}

void ofApp::draw(){
    
    if(mouse_on_road == true){
        ofBackground(230);
    }else{
        ofBackground(255,0,0);
    }
    
    if(mouse_on_road == true){
        ofSetColor(210);
    }else{
        ofSetColor(225,0,0);
    }
    ofRect(0, ofGetHeight()-robot_pos-40+15, ofGetWidth(), 80);
    
    ofEnableSmoothing();
    
    float vertWave = 0;
    
    for (unsigned int i=0; i<verticalOscilators.size(); i++) {
        ofSetColor(0, 127+i, 255, 150);
//        verticalOscilators[i].draw(); -> tekent ref circle
        vertWave += verticalOscilators[i].waveSin;
    }
    
    for (int i=1; i<TAIL_LENGTH; i++) {
        waveHistory[i-1] = waveHistory[i];
    }
    for (int i=1; i<WAVEFORM_HISTORY; i++) {
        vertWaveHistory[i-1]= vertWaveHistory[i];
    }
    
    vertWaveHistory[WAVEFORM_HISTORY-1] = vertWave;
    waveHistory[TAIL_LENGTH-1] = ofVec2f(vertWave,0);
    
    ofMesh wave;
    wave.setMode(OF_PRIMITIVE_LINE_STRIP);
    for (int i=0; i<TAIL_LENGTH; i++) {
        wave.addColor(ofFloatColor(0.1f,0.1f,0.1f, 0.5f + 0.5f * i/float(TAIL_LENGTH) ));
        wave.addVertex(waveHistory[i]);
    }
    
    ofMesh vWave;
    vWave.setMode(OF_PRIMITIVE_LINE_STRIP);
    for (int i=0; i<WAVEFORM_HISTORY; i++) {
        vWave.addColor(ofFloatColor(255, 240,10, 255));
        edge = vertWaveHistory[i]*0.1f*scale;
        edge_robot_pos = vertWaveHistory[robot_pos]*0.1f*scale;
        vWave.addVertex(ofVec3f(edge, i*vWaveMult, 0));
    }
    
    ofSetLineWidth(5);
    
    ofPushMatrix();
    ofRotateX(180);
    ofTranslate(center.x - road_width/2, -ofGetHeight(), 0);
    vWave.draw();
    ofPopMatrix();
    
    ofPushMatrix();
    ofRotateX(180);
    ofTranslate(center.x + road_width/2, -ofGetHeight(), 0);
    vWave.draw();
    ofPopMatrix();
    
    ofSetColor(200);
    ofFill();
    ofRectRounded(robot_xPos, robot_yPos, 50, 50, 10);
    
}

void ofApp::keyPressed(int key){
    if(key == OF_KEY_LEFT){
        if(robot_xPos > 100){
            robot_xPos -= 10;
        }
    }
    if(key == OF_KEY_RIGHT){
        if(robot_xPos < ofGetWidth() - 150){
            robot_xPos += 10;
        }
        
    }
}
