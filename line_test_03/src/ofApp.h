#pragma once

#include "ofMain.h"
#include "ofEvents.h"

#define TOP_MARGIN 0
#define LEFT_MARGIN 0

#define WAVEFORM_HISTORY 800
#define TAIL_LENGTH 400

class  oscillator {
public:
    
    float freq;
    float waveSin;
    float waveCos;
    float amplitude;
    float phase;
    double counter;
    
    float infl = 1;
    unsigned int update_counter = 1;
    
    ofVec2f pos;
    
    oscillator(){}
    ~oscillator(){}
    void setup(int x, int y){
        
        ofSetFrameRate(60);
        
        pos.set(x, y);
        freq = 0.02;
        
        counter = 0;
        
        phase = 10;
        amplitude = 150;
        
    }
    
    void update(){
        
        if(update_counter % 120 == 0){
            
//            infl = ofRandom(-100.0f, 100.0f);
//            amplitude += infl;
            
            amplitude = ofRandom(0.0f, 1000.0f);
            
        }
        
        update_counter++;
    
        counter += freq;
        waveSin = sin(counter + phase) * amplitude;
        waveCos = cos(counter + phase) * amplitude;
    }
    
    // tekent ref circle
    void draw(){
        ofFill();
        ofCircle(pos.x, pos.y, amplitude/4);
        ofSetColor(40);
        ofNoFill();
        ofCircle(pos.x, pos.y, amplitude/4);
        ofLine(pos.x, pos.y, pos.x +  waveCos/4, pos.y + waveSin/4);
    }
};

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();
    
        void keyPressed(int key);
    
        vector<oscillator>verticalOscilators;
    
        ofVec3f waveHistory [TAIL_LENGTH];
    
        float vertWaveHistory [WAVEFORM_HISTORY];
    
        ofPoint center;
        float scale;
    
        float vWaveMult;
        ofArduino	ard;
        bool		bSetupArduino;			// flag variable for setting up arduino once
    
    private:
    
        void setupArduino(const int & version);
        void digitalPinChanged(const int & pinNum);
        void analogPinChanged(const int & pinNum);
        void updateArduino();
    
        string buttonState;
		
};
