
import {expect} from 'chai';
import {exists, inject, Injectable, resetInjectables, resetInjectable} from './injects';


const assume = expect;

describe('Dependency Injection', () => {

  afterEach(resetInjectables);

  // tag::shouldRegisterDependency[]
  it('should register dependency', async () => {
    // Given
    class Sample {}
    assume(exists('Sample')).to.be.false;

    // When
    Injectable(Sample);

    // Then
    expect(exists('Sample')).to.be.true;
  });
  // end::shouldRegisterDependency[]

  // tag::shouldInjectDependency[]
  it('should inject dependency', async () => {
    // Given
    class Sample {}
    assume(exists('Sample')).to.be.false;
    Injectable(Sample);
    assume(exists('Sample')).to.be.true;

    // When
    const sample = inject(Sample);

    // Then
    expect(sample).to.be.an.instanceOf(Sample);
  });
  // end::shouldInjectDependency[]

  // tag::shouldInjectClassDependency[]
  it('should inject class dependency', async () => {
    // Given
    class Sample {}
    assume(exists('Sample')).to.be.false;

    // When
    const sample = inject(Sample);

    // Then
    expect(sample).to.not.be.null;true;
  });
  // end::shouldInjectClassDependency[]

  // tag::shouldInjectCustomObjectInstance[]
  it('should inject custom object instance', async () => {
    // Given
    assume(exists('sample')).to.be.false;
    class Sample { constructor(public value: string) {} }
    const sampleValue = 'testSampleValue';
    Injectable('sample', new Sample(sampleValue));
    assume(exists('sample')).to.be.true;

    // When
    const sample:Sample = inject('sample');

    // Then
    expect(sample.value).to.eql(sampleValue);
  });
  // end::shouldInjectCustomObjectInstance[]

  // tag::shouldInjectCustomClassInstance[]
  it('should inject custom class instance', async () => {
    // Given
    assume(exists('Sample')).to.be.false;
    class Sample { constructor(public value: string) {} }
    const sampleValue = 'testSampleValue';
    Injectable(Sample, new Sample(sampleValue));
    assume(exists('Sample')).to.be.true;

    // When
    const sample:Sample = inject(Sample);

    // Then
    expect(sample.value).to.eql(sampleValue);
  });
  // end::shouldInjectCustomClassInstance[]

  // tag::shouldThrowAssertExceptionWhenCreatingInjectableWithCustomStringKeyButWithoutInstance[]
  it('should throw assert exception when creating Injectable with custom string key but without instance', async () => {
    // Given
    assume(exists('sample')).to.be.false;

    let assertionError = false;
    try {
      // When
      Injectable('sample');
    } catch (e) {
      assertionError = true;
    }

    // Then
    expect(assertionError).to.be.true;
  });
  // end::shouldThrowAssertExceptionWhenCreatingInjectableWithCustomStringKeyButWithoutInstance[]

  // tag::shouldInjectString[]
  it('should inject string', async () => {
    // Given
    assume(exists('sample')).to.be.false;
    const sampleValue: string = 'testSample';
    Injectable('sample', sampleValue);
    assume(exists('sample')).to.be.true;

    // When
    const sample: string = inject('sample');

    // Then
    expect(sample).to.eql(sampleValue);
    expect(sample).to.be.a('string');
  });
  // end::shouldInjectString[]

  // tag::shouldInjectNumber[]
  it('should inject number', async () => {
    // Given
    assume(exists('sample')).to.be.false;
    const sampleValue: number = 1;
    Injectable('sample', sampleValue);
    assume(exists('sample')).to.be.true;

    // When
    const sample: number = inject('sample');

    // Then
    expect(sample).to.eql(sampleValue);
    expect(sample).to.be.a('number');
  });
  // end::shouldInjectNumber[]

  // tag::shouldRegister@Injectable[]
  it('should register @Injectable', async () => {
    // Given
    assume(exists('Sample')).to.be.false;

    // When
    @Injectable class Sample {}

    // Then
    expect(exists('Sample')).to.be.true;
  });
  // end::shouldRegister@Injectable[]

  // tag::shouldInjectInCascade[]
  it('should inject in cascade', async () => {
    // Given
    @Injectable class One {}
    @Injectable class Two { public one: One; constructor() { this.one = inject(One); } }
    @Injectable class Three { public two: Two; constructor() { this.two = inject(Two); } }

    // When
    const three = inject(Three);

    // Then
    expect(three).to.be.an.instanceOf(Three);
    expect(three.two).to.be.an.instanceOf(Two);
    expect(three.two.one).to.be.an.instanceOf(One);
  });
  // end::shouldInjectInCascade[]

  // tag::shouldResetInjectables[]
  it('should reset injectables', async () => {
    // Given
    assume(exists('Sample')).to.be.false;
    assume(exists('Sample')).to.be.false;
    class Sample {}
    class Sample2 {}
    Injectable(Sample);
    Injectable(Sample2);
    expect(exists('Sample')).to.be.true;
    expect(exists('Sample2')).to.be.true;

    // When
    resetInjectables();

    // Then
    expect(exists('Sample')).to.be.false;
    expect(exists('Sample2')).to.be.false;
  });
  // end::shouldResetInjectables[]

  // tag::shouldResetInjectable[]
  it('should reset injectable', async () => {
    // Given
    assume(exists('Sample')).to.be.false;
    assume(exists('Sample')).to.be.false;
    class Sample {}
    class Sample2 {}
    Injectable(Sample);
    Injectable(Sample2);
    expect(exists('Sample')).to.be.true;
    expect(exists('Sample2')).to.be.true;

    // When
    resetInjectable('Sample');

    // Then
    expect(exists('Sample')).to.be.false;
    expect(exists('Sample2')).to.be.true;
  });
  // end::shouldResetInjectable[]

});
