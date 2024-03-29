/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';

import {
    LAYER_SELECTED_FOR_SEARCH,
    FEATURE_TYPE_SELECTED,
    FEATURE_TYPE_LOADED,
    FEATURE_TYPE_ERROR,
    FEATURE_LOADING,
    FEATURE_LOADED,
    FEATURE_ERROR,
    QUERY_RESULT,
    QUERY_ERROR,
    QUERY_CREATE,
    QUERY,
    RESET_QUERY,
    INIT_QUERY_PANEL,
    TOGGLE_LAYER_FILTER,
    initQueryPanel,
    layerSelectedForSearch,
    featureTypeSelected,
    featureTypeLoaded,
    featureTypeError,
    featureLoading,
    featureLoaded,
    featureError,
    querySearchResponse,
    queryError,
    createQuery,
    query,
    resetQuery,
    toggleLayerFilter
} from '../wfsquery';

describe('wfsquery actions', () => {
    it('layerSelectedForSearch', () => {
        let {type, id} = layerSelectedForSearch(1);
        expect(type).toBe(LAYER_SELECTED_FOR_SEARCH);
        expect(id).toBe(1);
    });
    it('layerSelectedForSearch', () => {
        let {type} = initQueryPanel();
        expect(type).toBe(INIT_QUERY_PANEL);
    });
    it('featureTypeSelected without owner', () => {
        let {type, url, typeName, fields} = featureTypeSelected("/geoserver/", "topp:states", [{name: "name", alias: "alias"}]);
        expect(type).toBe(FEATURE_TYPE_SELECTED);
        expect(url).toBe("/geoserver/");
        expect(typeName).toBe("topp:states");
        expect(fields).toEqual([{name: "name", alias: "alias"}]);
    });

    it('featureTypeSelected with owner as parameter', () => {
        let {type, url, typeName, fields, owner} = featureTypeSelected("/geoserver/", "topp:states", [{name: "name", alias: "alias"}], "owner");
        expect(type).toBe(FEATURE_TYPE_SELECTED);
        expect(url).toBe("/geoserver/");
        expect(typeName).toBe("topp:states");
        expect(fields).toEqual([{name: "name", alias: "alias"}]);
        expect(owner).toBe("owner");
    });
    it('featureTypeLoaded without owner', () => {
        let {type, typeName, featureType} = featureTypeLoaded("topp:states", "featureType");
        expect(type).toBe(FEATURE_TYPE_LOADED);
        expect(typeName).toBe("topp:states");
        expect(featureType).toBe("featureType");
    });

    it('featureTypeLoaded with owner as parameter', () => {
        let {type, typeName, featureType, owner} = featureTypeLoaded("topp:states", "featureType", "owner");
        expect(type).toBe(FEATURE_TYPE_LOADED);
        expect(typeName).toBe("topp:states");
        expect(featureType).toBe("featureType");
        expect(owner).toBe("owner");
    });
    it('featureTypeError', () => {
        let {type, error, typeName} = featureTypeError("topp:states", "ERROR");
        expect(type).toBe(FEATURE_TYPE_ERROR);
        expect(error).toBe("ERROR");
        expect(typeName).toBe("topp:states");
    });
    it('featureLoading', () => {
        let {type, isLoading} = featureLoading(true);
        expect(type).toBe(FEATURE_LOADING);
        expect(isLoading).toBe(true);
    });
    it('featureLoaded', () => {
        let {type, typeName, feature} = featureLoaded("topp:states", "feature");
        expect(type).toBe(FEATURE_LOADED);
        expect(typeName).toBe("topp:states");
        expect(feature).toBe(feature);
    });
    it('featureLoaded with owner as parameter', () => {
        let {type, typeName, feature} = featureLoaded("topp:states", "feature");
        expect(type).toBe(FEATURE_LOADED);
        expect(typeName).toBe("topp:states");
        expect(feature).toBe(feature);
    });
    it('featureError', () => {
        let {type, typeName, error} = featureError("topp:states", "ERROR");
        expect(type).toBe(FEATURE_ERROR);
        expect(typeName).toBe("topp:states");
        expect(error).toBe("ERROR");
    });
    it('querySearchResponse', () => {
        let {type, result, searchUrl, filterObj} = querySearchResponse("result", "searchUrl", "filterObj");
        expect(type).toBe(QUERY_RESULT);
        expect(result).toBe("result");
        expect(searchUrl).toBe("searchUrl");
        expect(filterObj).toBe("filterObj");
    });
    it('queryError', () => {
        let {type, error} = queryError("ERROR");
        expect(type).toBe(QUERY_ERROR);
        expect(error).toBe("ERROR");
    });
    it('createQuery', () => {
        let {type, searchUrl, filterObj} = createQuery("searchUrl", "filterObj");
        expect(type).toBe(QUERY_CREATE);
        expect(searchUrl).toBe("searchUrl");
        expect(filterObj).toBe("filterObj");
    });
    it('createQuery with owner param', () => {
        let {type, searchUrl, filterObj, owner} = createQuery("searchUrl", "filterObj", "owner");
        expect(type).toBe(QUERY_CREATE);
        expect(searchUrl).toBe("searchUrl");
        expect(filterObj).toBe("filterObj");
        expect(owner).toBe("owner");
    });
    it('query', () => {
        let {type, searchUrl, filterObj} = query("searchUrl", "filterObj");
        expect(type).toBe(QUERY);
        expect(searchUrl).toBe("searchUrl");
        expect(filterObj).toBe("filterObj");
    });
    it('query with query options', () => {
        let { type, searchUrl, filterObj, queryOptions } = query("searchUrl", "filterObj", "queryOptions");
        expect(type).toBe(QUERY);
        expect(searchUrl).toBe("searchUrl");
        expect(filterObj).toBe("filterObj");
        expect(queryOptions).toBe("queryOptions");
    });
    it('resetQuery', () => {
        let {type} = resetQuery();
        expect(type).toBe(RESET_QUERY);
    });
    it('toggleLayerFilter', () => {
        let {type} = toggleLayerFilter();
        expect(type).toBe(TOGGLE_LAYER_FILTER);
    });
});
