import StringUtils from 'js/services/StringUtils';
import RegexUtils from 'js/services/RegexUtils';
import Utils from 'js/services/utils';

describe('StringUtils methos', () => {
    
   it ('Removing new lines from string', () => {
     let stringText = 'test \n test \n test';
     let newString = StringUtils.removeNewLines(stringText);
     expect(RegexUtils.newLines.test(newString)).toBe(false);
   });
  
  it ('Removing spaces from string', () => {
     let stringText = "test \n test \n test";
     let newString = StringUtils.removeSpaces(stringText);
     expect(RegexUtils.spaces.test(newString)).toBe(false);
  });
 
  it ('Removing tabs from string', () => {
     let stringText = "test \t test \t test";
     let newString = StringUtils.removeTabs(stringText);
     expect(RegexUtils.tabs.test(newString)).toBe(false);
  });
  
  it ('Removing backslashes from string', () => {
     let stringText = "test \t test \t test";
     let newString = StringUtils.removeEscapes(stringText);
     expect(RegexUtils.backslashes.test(newString)).toBe(false);
  });
 
  it ('Removing tabs/new lines/spaces from string', () => {
     let stringText = "\n test \t \ test \n \t test";
     let newString = Utils.removeFormattationFromString(stringText);
     expect(!RegexUtils.tabs.test(newString) && !RegexUtils.spaces.test(newString) && !RegexUtils.newLines.test(newString)).toBe(true);
  });

});
