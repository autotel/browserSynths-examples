var masterLooper=(function(){
  var patterns=[];
  var step=0;
  //create a new cycling loop
  var ProtoCycle=function(options){
    this.stepCount=0;
    this.displacement=0;
    this.every=4;
    this.length=16;
    this.memory={};
    this.name="loop";
    this.onBeat=function(a){
      console.log("beat",a);
    }
    //apply user customization options
    for(var a in options){
      if(this[a]){
        this[a]=options[a];
      }else{
        console.log(this.name+"tried to add the option of "+a+" but this object doesnt support it");
      }
    }
    patterns.push(this);
    this.step=function(tvars){
      var currentStepHeader=this.stepCount%this.length;
      if(this.memory=="all"){
        this.onBeat(currentStepHeader);
      }else if(this.memory[currentStepHeader]){
        this.onBeat(this.memory[currentStepHeader]);
      }
      this.stepCount++;
    }
  }

  this.create=function(a){
    return new ProtoCycle(a);
  }
  //count steps and trigger corresponding sequencer
  this.step=function(time){
    for(var a in patterns){
      // console.log(a+",s");
      var thisPattern=patterns[a];
      // console.log(step%thisPattern.every);
      if(step%thisPattern.every==0){
        thisPattern.step({time:time,step:step});
      }
    }
    step++;
    return step;
  }
  return this;
})();