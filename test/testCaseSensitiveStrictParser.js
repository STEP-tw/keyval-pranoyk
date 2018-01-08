const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],false);
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified key is not equal to actual",function(){
    let kvParser=new StrictParser(["nAme"],false);
    let expected=new Parsed();
    expected["Name"]="jayanth";
    let parsed=kvParser.parse("Name=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when keys contains numbers",function(){
    let kvParser=new StrictParser(["nAme123"],false);
    let expected=new Parsed();
    expected["Name123"]="jayanth";
    let parsed=kvParser.parse("Name123=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when keys include special characters ",function(){
    let kvParser=new StrictParser(["nAme_123"],false);
    let expected=new Parsed();
    expected["nAme_123"]="jayanth";
    let parsed=kvParser.parse("nAme_123=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when keys include special characters ",function(){
    let kvParser=new StrictParser(["nAme","age"],false);
    let expected=new Parsed();
    expected["nAme"]="jayanth";
    let parsed=kvParser.parse("nAme=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when keys include special characters ",function(){
    let kvParser=new StrictParser(["nAme_123","Age"],false);
    let expected=new Parsed();
    expected["nAme_123"]="jayanth";
    expected["age"]="35";
    let parsed=kvParser.parse("nAme_123=jayanth age=35");
    assert.deepEqual(parsed,expected);
    assert.deepEqual(parsed,expected);
  });
});


describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });

  it("should throw error when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],true);
    assert.throws(()=>{
      kvParser.parse("name=jayanth");
    })
  });

  it("should throw error when specified keys are not equal to actual",function(){
    let kvParser=new StrictParser(["NAMEE"],true);
    assert.throws(()=>{
      kvParser.parse("name=jayanth");
    })
  });

  it("should throw error when actual key contains other characters than specified key",function(){
    let kvParser=new StrictParser(["NAMEE"],true);
    assert.throws(()=>{
      kvParser.parse("name_123=jayanth");
    })
  });
});
