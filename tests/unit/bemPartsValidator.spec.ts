import BemPartsValidator from '@/utils/bemPartsValidator';
import MessageType from '@/enums/messageType';
import BemPart from '@/models/bemPart';
import BemPartType from '@/enums/bemPartType';

describe('BemPartsValidator', () => {
  it('returns no messages when only block exists', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(0);
  });

  it('returns error message when 2 elements exist', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element1' },
      { id: 'Id3', partType: BemPartType.element, value: 'element2' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.error);
    expect(messages[0].text).toStartWith('There are 2 elements');
  });

  it('returns error message when 2 modifiers exist', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.modifier, value: 'modifier1' },
      { id: 'Id3', partType: BemPartType.modifier, value: 'modifier2' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.error);
    expect(messages[0].text).toStartWith('There are 2 modifiers');
  });

  it('returns warning message when an element ends with a hyphen', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element-' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toEqual('The element ends with a hyphen or an underscore.');
  });

  it('returns warning message when an element ends with an underscore', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element_' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toEqual('The element ends with a hyphen or an underscore.');
  });

  it('returns warning message when a modifier ends with a hypen', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.modifier, value: 'modifier-' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toEqual('The modifier ends with a hyphen or an underscore.');
  });

  it('returns warning message when a modifier ends with an underscore', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.modifier, value: 'modifier_' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toEqual('The modifier ends with a hyphen or an underscore.');
  });

  it('returns no messages for block & element', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(0);
  });

  it('returns no messages for block & modifier', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.modifier, value: 'modifier' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(0);
  });

  it('returns no messages for block, element & modifier', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element' },
      { id: 'Id3', partType: BemPartType.modifier, value: 'modifier' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(0);
  });

  it('returns no messages for block, element & modifier', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element' },
      { id: 'Id3', partType: BemPartType.modifier, value: 'modifier' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(0);
  });

  it('returns warning message when a element contains block', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.element, value: 'element-block' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toEqual('The element contains the block name "block".');
  });

  it('returns warning message when a modifier contains block', () => {
    const bemParts: BemPart[] = [
      { id: 'Id1', partType: BemPartType.block, value: 'block' },
      { id: 'Id2', partType: BemPartType.modifier, value: 'block-modifier' }
    ];

    const messages = BemPartsValidator.validate(bemParts);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toEqual('The modifier contains the block name "block".');
  });
});
